var newDataLink = (function() {
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

    function DataLink(cmd, options) {
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
        var doLogging = false;
        function logging(url, method, body, response, duration) {
            if(!doLogging) return;
            console.log(`[DataLink] ${method} ${url} - ${duration}ms`);
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
        var _beforeGetRequst = Hison.link.beforeGetRequst;
        var _beforePostRequst = Hison.link.beforePostRequst;
        var _beforePutRequst = Hison.link.beforePutRequst;
        var _beforePatchRequst = Hison.link.beforePatchRequst;
        var _beforeDeleteRequst = Hison.link.beforeDeleteRequst;
        var _beforeCallbackWorked = Hison.link.beforeCallbackWorked;
        var _beforeCallbackErrorFunc = Hison.link.beforeCallbackError;

        if(options) {
            if (options && options.constructor !== Object) {
                throw new Error("obtions must be an object which contains key and value.");
            }
            if(options.useCache === true) {

            }
        }
        
        var _validateParams = function(dw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options, isGet) {
            if(!isGet) {
                if (!_cmd) {
                    throw new Error("Command not specified");
                }
                if(dw && !dw.isDataWrapper) {
                    throw new Error("Please insert only a valid data type.");
                }
            }
            if (beforeCallbackWorkedFunc && typeof beforeCallbackWorkedFunc !== 'function') {
                throw new Error("beforeCallbackWorkedFunc must be a function.");
            }
            if (beforeCallbackErrorFunc && typeof beforeCallbackErrorFunc !== 'function') {
                throw new Error("beforeCallbackErrorFunc must be a function.");
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
            var result = null;
            if(resultData && resultData.constructor === Object) {
                result = newDataWrapper();
                for(var key of Object.keys(resultData)) {
                    if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                        result.putDataModel(key, newDataModel(resultData[key]));
                    } else {
                        result.put(key, resultData[key]);
                    }
                }
            } else if (resultData && resultData.constructor !== Object) {
                result = resultData;
            }
            return result;
        }

        /**
         * 
         * @param {String} methodName 
         * @param {String or DataWrapper} requestDwOrResourcePath 
         * @param {Function} beforeCallbackWorkedFunc 
         * @param {Function} beforeCallbackErrorFunc 
         * @param {Object} options {headers : Object, timeout : Integer(>= 0), fetchOptions : Object(except method, headers, body)}
         * @returns 
         */
        var _request = async function(methodName, requestDwOrResourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
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
            _validateParams(requestDwOrResourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options, isGet);

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
            var url = isGet ? _rootUrl + requestDwOrResourcePath : _rootUrl + _controllerPath;
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
                var result = _getRsultDataWrapper(resultData);
                eventEmitter.emit('requestCompleted_Data', { data: result, response: rtn.response });
                if(_beforeCallbackWorked(result, rtn.response) === false) return;
                if(beforeCallbackWorkedFunc) beforeCallbackWorkedFunc(result, rtn.response);
                return { data: result, response: rtn.response };
            })
            .catch(error => {
                logging(url, methodName, fetchOptions.body, error, Date.now() - startTime);
                eventEmitter.emit('requestError', error);
                if(_beforeCallbackErrorFunc(error) === false) return;
                if(beforeCallbackErrorFunc) beforeCallbackErrorFunc(error);
                throw error;
            });
        
            return racePromise;
        };

        this.get = function(resourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
            if(_beforeGetRequst(resourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) === false) return;
            return _request('GET', resourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options);
        };

        this.post = function(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
            if(_beforePostRequst(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) === false) return;
            return _request('POST', requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options);
        };
        
        this.put = function(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
            if(_beforePutRequst(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) === false) return;
            return _request('PUT', requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options);
        };
        
        this.patch = function(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
            if(_beforePatchRequst(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) === false) return;
            return _request('PATCH', requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options);
        };
        
        this.delete = function(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
            if(_beforeDeleteRequst(requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) === false) return;
            return _request('DELETE', requestDataWrapper, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options);
        };

        this.setCmd = function(cmd) {
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
            eventEmitter.on(eventName, eventFunc);
        };

        this.setLogging = function(bool) {
            doLogging = bool;
        }

        //create
        if (!cmd) {
            return;
        } else {
            _cmd = cmd;
        }
    }
    return function(keyOrObject, value) {
        return new DataLink(keyOrObject, value);
    };
})();

if(!Hison) {
    var Hison = {
        link : {
            protocol : "http://",
            domain : 'localhost:8081',
            controllerPath : '/api',
            timeout : 5000,
            beforeGetRequst : function(resourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
                return true;
            },
            beforePostRequst : function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
                return true;
            },
            beforePutRequst : function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
                return true;
            },
            beforePatchRequst : function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
                return true;
            },
            beforeDeleteRequst : function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
                return true;
            },
            beforeCallbackWorked : function(result, response) {
                return true;
            },
            beforeCallbackError : function(error) {
                return true;
            },
        },
        caching : {
            isUsing : true,
            protocol : "ws://",
            wsEndPoint : "/caching-websocket-endpoint",
            limit : 10,
        },
    };
}

var CachingModule = (function() {
    if(!Hison.caching.isUsing) return;
    var _limit = Hison.caching.limit;
    var _webSocketUrl = Hison.caching.protocol + Hison.link.domain + Hison.caching.wsEndPoint;
    var webSocket = new WebSocket(_webSocketUrl);

    webSocket.onopen = function(event) {};
    webSocket.onmessage = function(event) {};
    webSocket.onclose = function(event) {};

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

    return {
        get: function(key) {
            return lruCache.get(key);
        },
        put : function(key, value) {
            lruCache.put(key, value);
        },
        remove : function(key) {
            lruCache.remove(key);
        },
        getAll : function() {
            return lruCache.getAll();
        },
        clear : function() {
            lruCache.clear();
        },
        onopen : function(func) {
            webSocket.onopen = func;
        },
        onmessage : function(func) {
            webSocket.onmessage = func;
        },
        onclose : function(func) {
            webSocket.onclose = func;
        },
    };
})();
