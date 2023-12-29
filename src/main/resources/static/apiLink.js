var newCachingModule = (function() {
    function CachingModule() {
        var _limit = Hison.caching.limit;
        var _webSocketUrl = Hison.caching.protocol + Hison.link.domain + Hison.caching.wsEndPoint;
        var webSocket = new WebSocket(_webSocketUrl);

        webSocket.onopen = function(event) {};
        webSocket.onmessage = function(event) {};
        webSocket.onclose = function(event) {};

        function checkWebSocketConnection() {
            if (webSocket.readyState === WebSocket.OPEN) {
                return 1;
            } else if (webSocket.readyState === WebSocket.CONNECTING) {
                return 0;
            } else {
                return -1;
            }
        }

        function LRUCache(limit) {
            this.limit = limit;
            this.cache = {};
            this.keys = [];
        }
    
        LRUCache.prototype.get = function(key) {
            if (!this.cache.hasOwnProperty(key)) return null;
            var value = this.cache[key];
    
            this.remove(key);
            this.keys.push(key);
    
            return value;
        };
        LRUCache.prototype.put = function(key, value) {
            if (this.cache.hasOwnProperty(key)) {
                this.remove(key);
            } else if (this.keys.length == this.limit) {
                var oldestKey = this.keys.shift();
                delete this.cache[oldestKey];
            }
    
            this.cache[key] = value;
            this.keys.push(key);
        };
        LRUCache.prototype.remove = function(key) {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        };
        LRUCache.prototype.getAll = function() {
            return {cache : this.cache, keys : this.keys};
        };
        LRUCache.prototype.clear = function() {
            this.cache = {};
            this.keys = [];
        };

        var lruCache = new LRUCache(_limit);

        this.get = function(key) {
            return lruCache.get(key);
        };

        this.put = function(key, value) {
            lruCache.put(key, value);
        };

        this.remove = function(key) {
            lruCache.remove(key);
        };

        this.getAll = function() {
            return lruCache.getAll();
        };

        this.clear = function() {
            lruCache.clear();
        };

        this.onopen = function(func) {
            webSocket.onopen = func;
        };

        this.onmessage = function(func) {
            webSocket.onmessage = func;
        };

        this.onclose = function(func) {
            webSocket.onclose = func;
        };

        this.isWebSocketConnection = function() {
            return checkWebSocketConnection();
        }

        this.isCachingModule = true;
    }
    return function() {
        var cachingModule = new CachingModule();
        cachingModule.onmessage(function (event) {
            cachingModule.clear();
        });
        return cachingModule;
    };
})();

var newApiLink = (function() {
    /********************
     * EventEmitter 구현
     ********************/
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    };
    
    EventEmitter.prototype.emit = function(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    };
    /********************
     * EventEmitter 구현
     ********************/

    function ApiLink(cmd, options) {
        /********************
         * EventEmitter 구현
         ********************/
        var eventEmitter = new EventEmitter();
        /********************
         * EventEmitter 구현
         ********************/
        /********************
         * Logging 구현
         ********************/
        function logging(url, method, body, response, duration) {
            if(!_doLogging) return;
            console.log(`[ApiLink] ${method} ${url} - ${duration}ms`);
            console.log('Request Body:', body);
            console.log('Response:', response);
        }
        /********************
         * Logging 구현
         ********************/

        var _cmd;
        var _rootUrl = Hison.link.protocol + Hison.link.domain;
        var _controllerPath = Hison.link.controllerPath;
        var _timeout = Hison.link.timeout;
        var _doLogging = false;
        var _cachingModule = null;
        var _beforeGetRequst = Hison.link.beforeGetRequst;
        var _beforePostRequst = Hison.link.beforePostRequst;
        var _beforePutRequst = Hison.link.beforePutRequst;
        var _beforePatchRequst = Hison.link.beforePatchRequst;
        var _beforeDeleteRequst = Hison.link.beforeDeleteRequst;
        var _beforeCallbackWorked = Hison.link.beforeCallbackWorked;
        var _callbackErrorFunc = Hison.link.beforeCallbackError;

        if(options) {
            if (options.constructor !== Object) {
                throw new Error("obtions must be an object which contains key and value.");
            }
            if(options.logging) _doLogging = (options.logging === true);
            if(options.cachingModule && options.cachingModule.isCachingModule) {
                _cachingModule = options.cachingModule;
            }
        }
        
        var _validateParams = function(requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options, isGet) {
            if(!isGet) {
                if (!_cmd) {
                    throw new Error("Command not specified");
                }
                if(requestDwOrResourcePath && !requestDwOrResourcePath.isDataWrapper) {
                    throw new Error("Please insert only a valid data type.");
                }
            } else {
                if(typeof requestDwOrResourcePath !== 'string') {
                    throw new Error("Please insert a string as ResourcePath URL.");
                }
            }
            if (callbackWorkedFunc && typeof callbackWorkedFunc !== 'function') {
                throw new Error("Callback Worked Function must be a function.");
            }
            if (callbackErrorFunc && typeof callbackErrorFunc !== 'function') {
                throw new Error("Callback Error Function must be a function.");
            }
            if (options && options.constructor !== Object) {
                throw new Error("obtions must be an object which contains key and value.");
            }
        };

        var _validateHeaders = function(headers) {
            if (headers.constructor !== Object) {
                throw new Error("Headers must be an object which contains key and value.");
            }
            Object.keys(headers).forEach(key => {
                if (typeof headers[key] !== 'string') {
                    throw new Error("All header values must be strings.");
                }
            });
        };

        var _validateTimeout = function(timeout) {
            if (typeof timeout !== 'number' || timeout <= 0 || !Number.isInteger(timeout)) {
                throw new Error("Timeout must be a positive integer.");
            }
        };


        var _validateFetchOptions = function(fetchOptions) {
            if (fetchOptions.constructor !== Object) {
                throw new Error("fetchOptions must be an object which contains key and value.");
            }
        };

        var _getDataWrapper = function(dw) {
            if(dw) {
                dw.putString('cmd',_cmd);
            } else {
                dw = newDataWrapper('cmd',_cmd);
            }
            return dw;
        };

        var _getRsultDataWrapper = function(resultData) {
            var data = null;
            if(resultData && resultData.constructor === Object) {
                data = newDataWrapper();
                for(var key of Object.keys(resultData)) {
                    if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                        data.putDataModel(key, newDataModel(resultData[key]));
                    } else {
                        data.put(key, resultData[key]);
                    }
                }
            } else if (resultData && resultData.constructor !== Object) {
                data = resultData;
            }
            return data;
        }

        /**
         * 
         * @param {String} methodName 
         * @param {String or DataWrapper} requestDwOrResourcePath 
         * @param {Function} callbackWorkedFunc 
         * @param {Function} callbackErrorFunc 
         * @param {Object} options {headers : Object, timeout : Integer(>= 0), fetchOptions : Object(except method, headers, body)}
         * @returns 
         */
        var _request = async function(methodName, requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            switch (methodName.toUpperCase()) {
                case 'GET':
                    eventEmitter.emit('requestStarted_GET', requestDwOrResourcePath, options);
                    break;
                case 'POST':
                    eventEmitter.emit('requestStarted_POST', requestDwOrResourcePath, options);
                    break;
                case 'PUT':
                    eventEmitter.emit('requestStarted_PUT', requestDwOrResourcePath, options);
                    break;
                case 'PATCH':
                    eventEmitter.emit('requestStarted_PATCH', requestDwOrResourcePath, options);
                    break;
                case 'DELETE':
                    eventEmitter.emit('requestStarted_DELETE', requestDwOrResourcePath, options);
                    break;
                default:
                    break;
            }
            var isGet = methodName.toUpperCase() === 'GET';
            _validateParams(requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options, isGet);

            var url = isGet ? _rootUrl + requestDwOrResourcePath : _rootUrl + _controllerPath;
            if(_cachingModule && _cachingModule.isWebSocketConnection() === 1 && _cachingModule.get(isGet ? url : _cmd)) {
                var result = _cachingModule.get(isGet ? url : _cmd);
                if(_beforeCallbackWorked(result.data, result.response) !== false) {
                    if(callbackWorkedFunc) callbackWorkedFunc(result.data, result.response);
                };
                return result;
            }

            var timeout = _timeout;
            var requestDw = isGet ? null : _getDataWrapper(requestDwOrResourcePath);
            var fetchOptions = {
                method: methodName,
                headers: {'Content-Type': 'application/json'},
                body: isGet ? null : requestDw.getSerialized(),
            }
            if(options) {
                if(options.headers) {
                    _validateHeaders(options.headers);
                    fetchOptions.headers =  Object.assign({'Content-Type': 'application/json'}, options.headers);
                }
                if(options.timeout) {
                    _validateTimeout(options.timeout);
                    timeout = options.timeout
                }
                if(options.fetchOptions) {
                    _validateFetchOptions(options.fetchOptions);
                    Object.keys(options.fetchOptions).forEach(key => {
                        if(['method','headers','body'].indexOf(key.toLowerCase()) === -1) {
                            fetchOptions[key] = options.fetchOptions[key];
                        }
                    });
                }
            }

            var timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), timeout)
            );
            var fetchPromise = fetch(url, fetchOptions);
            var startTime = Date.now();
            var racePromise = Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                logging(url, methodName, fetchOptions.body, response, Date.now() - startTime);
                eventEmitter.emit('requestCompleted_Response', response);
                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => ({ data: data, response: response }));
                } else if (contentType) {
                    return response.text().then(text => ({ data: text ? text : null, response: response }));
                } else {
                    return { data: null, response: response };
                }
            })
            .then(rtn => {
                var resultData = rtn.data;
                var data = _getRsultDataWrapper(resultData);
                eventEmitter.emit('requestCompleted_Data', { data: data, response: rtn.response });
                if(_cachingModule && _cachingModule.isWebSocketConnection() === 1) _cachingModule.put(isGet ? url : _cmd, { data: data, response: rtn.response });
                if(_beforeCallbackWorked(data, rtn.response) !== false) {
                    if(callbackWorkedFunc) callbackWorkedFunc(data, rtn.response);
                }
                return { data: data, response: rtn.response };
            })
            .catch(error => {
                logging(url, methodName, fetchOptions.body, error, Date.now() - startTime);
                eventEmitter.emit('requestError', error);
                if(_callbackErrorFunc(error) !== false) {
                    if(callbackErrorFunc) callbackErrorFunc(error);
                }
                throw error;
            });
        
            return racePromise;
        };

        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforeGetRequst(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('GET', resourcePath, callbackWorkedFunc, callbackErrorFunc, options);
        };

        this.post = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePostRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('POST', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        this.put = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePutRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('PUT', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        this.patch = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePatchRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('PATCH', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        this.delete = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforeDeleteRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('DELETE', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };

        this.setCmd = function(cmd) {
            if (!cmd) {
                throw new Error("cmd is required.");
            }
            if (typeof cmd !== 'string') {
                throw new Error("cmd must be a string.");
            }
            _cmd = cmd;
        };

        /**
         * requestStarted_GET
         * requestStarted_POST
         * requestStarted_PUT
         * requestStarted_PATCH
         * requestStarted_DELETE
         * requestCompleted_Response
         * requestCompleted_Data
         * requestError
         */
        this.onEventEmit = function(eventName, eventFunc) {
            if (!eventName) {
                throw new Error("Event name is required.");
            }
            if (!eventFunc) {
                throw new Error("Event function is required.");
            }
            if (typeof eventName !== 'string') {
                throw new Error("Event name must be a string.");
            }
            if (['requestStarted_GET',
                 'requestStarted_POST',
                 'requestStarted_PUT',
                 'requestStarted_PATCH',
                 'requestStarted_DELETE',
                 'requestCompleted_Response',
                 'requestCompleted_Data',
                 'requestError'].indexOf(eventName) === -1) {
                throw new Error("Invalid event name."
                + "\nCurrent event name: " + eventName
                + "\nValid event names are:"
                + "\nrequestStarted_GET"
                + "\nrequestStarted_POST"
                + "\nrequestStarted_PUT"
                + "\nrequestStarted_PATCH"
                + "\nrequestStarted_DELETE"
                + "\nrequestCompleted_Response"
                + "\nrequestCompleted_Data"
                + "\nrequestError"
                );
            }
            if (typeof eventFunc !== 'function') {
                throw new Error("Event function must be a function.");
            }
            eventEmitter.on(eventName, eventFunc);
        };

        //create
        if (!cmd) {
            return;
        } else {
            _cmd = cmd;
        }
    }
    return function(keyOrObject, value) {
        return new ApiLink(keyOrObject, value);
    };
})();

if(!Hison) {
    var Hison = {
        link : {
            protocol : "http://",
            domain : 'localhost:8081',
            controllerPath : '/hison-api-link',
            timeout : 5000,
            beforeGetRequst : function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePostRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePutRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePatchRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforeDeleteRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforeCallbackWorked : function(data, response) {
                return true;
            },
            beforeCallbackError : function(error) {
                return true;
            },
        },
        caching : {
            protocol : "ws://",
            wsEndPoint : "/hison-caching-websocket-endpoint",
            limit : 10,
        },
    };
}
