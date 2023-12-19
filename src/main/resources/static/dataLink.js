var newDataLink = (function() {
    function DataLink(cmd) {
        var _cmd;
        var _rootUrl = Hison.link.custom.rootUrl;
        var _controllerPath = Hison.link.custom.controllerPath;
        var _timeout = Hison.link.custom.timeout;
        var _BeforeGetRequst = Hison.link.custom.BeforeGetRequst;
        var _BeforePostRequst = Hison.link.custom.BeforePostRequst;
        var _BeforePutRequst = Hison.link.custom.BeforePutRequst;
        var _BeforePatchRequst = Hison.link.custom.BeforePatchRequst;
        var _BeforeDeleteRequst = Hison.link.custom.BeforeDeleteRequst;
        var _callbackWorked = Hison.link.custom.callbackWorked;
        var _callbackErrorFunc = Hison.link.custom.callbackError;
        
        var _validateParams = function(dw, callbackWorkedFunc, callbackErrorFunc, options, isGet) {
            if(!isGet) {
                if (!_cmd) {
                    throw new Error("Command not specified");
                }
                if(dw && (!(dw.getType) || dw.getType() !== 'datawrapper')) {
                    throw new Error("Please insert only a valid data type.");
                }
            }
            if (callbackWorkedFunc && typeof callbackWorkedFunc !== 'function') {
                throw new Error("callbackWorkedFunc must be a function.");
            }
            if (callbackErrorFunc && typeof callbackErrorFunc !== 'function') {
                throw new Error("callbackErrorFunc must be a function.");
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
         * 캐싱로직 구현
         */

        var webSocket = new WebSocket("ws://localhost:8080/websocket-endpoint");

        webSocket.onmessage = function(event) {
            // 서버에서 데이터 변경 알림을 받음
            clearCache(); // 캐시를 클리어하거나 업데이트
        };
        
        function clearCache() {
            // 캐시 클리어 로직
        }

        function LRUCache(limit) {
            this.limit = limit || 10; // 캐시 크기 제한
            this.map = new Map();
        }
        
        LRUCache.prototype.get = function(key) {
            if (!this.map.has(key)) return null;
            var value = this.map.get(key);
            this.map.delete(key); // 캐시에서 항목을 제거하고
            this.map.set(key, value); // 가장 최근에 사용된 것으로 다시 삽입
            return value;
        };
        
        LRUCache.prototype.put = function(key, value) {
            if (this.map.has(key)) this.map.delete(key); // 이미 존재하는 경우 제거
            else if (this.map.size == this.limit) {
                this.map.delete(this.first()); // 캐시가 가득 차면 가장 오래된 항목 제거
            }
            this.map.set(key, value);
        };
        
        LRUCache.prototype.first = function() {
            return this.map.keys().next().value;
        };




        /**
         * 캐싱로직 구현
         */



        var _request = async function(methodName, requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            var isGet = methodName.toUpperCase() === 'GET';
            _validateParams(requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options, isGet);

            var combinedHeaders = {'Content-Type': 'application/json'};
            var timeout = _timeout;
            if(options) {
                if(options.headers) {
                    _validateHeaders(options.headers);
                    combinedHeaders =  Object.assign(combinedHeaders, options.headers);
                }
                if(options.timeout) {
                    _validateTimeout(options.timeout);
                    timeout = options.timeout
                }
            }
            var requestDw = isGet ? null : _getDataWrapper(requestDwOrResourcePath);
            var timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), timeout)
            );
            var url = isGet ? _rootUrl + requestDwOrResourcePath : _rootUrl + _controllerPath;
            var fetchPromise = fetch(url, {
                method: methodName,
                headers: combinedHeaders,
                body: isGet ? null : requestDw.getSerialized(),
            });

            var racePromise = Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
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
                if(callbackWorkedFunc) {
                    _callbackWorked(result, rtn.response, callbackWorkedFunc);
                }
                return { data: result, response: rtn.response };
            })
            .catch(error => {
                if(callbackErrorFunc) {
                    _callbackErrorFunc(error, callbackErrorFunc);
                }
                throw error;
            });
        
            return racePromise;
        };

        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            return _BeforeGetRequst('GET', resourcePath, callbackWorkedFunc, callbackErrorFunc, options, _request);
        };

        this.post = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            return _BeforePostRequst('POST', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options, _request);
        };
        
        this.put = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            return _BeforePutRequst('PUT', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options, _request);
        };
        
        this.patch = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            return _BeforePatchRequst('PATCH', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options, _request);
        };
        
        this.delete = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            return _BeforeDeleteRequst('DELETE', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options, _request);
        };

        this.setCmd = function(cmd) {
            _cmd = cmd;
        };

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
if(Hison) {
    Hison.link.custom.rootUrl = 'http://localhost:8081/';
    Hison.link.custom.controllerPath = 'api';
    Hison.link.custom.timeout = 5000;
    Hison.link.custom.BeforeGetRequst = function(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options);
    };
    Hison.link.custom.BeforePostRequst = function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
    };
    Hison.link.custom.BeforePutRequst = function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
    };
    Hison.link.custom.BeforePatchRequst = function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
    };
    Hison.link.custom.BeforeDeleteRequst = function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
    };
    Hison.link.custom.callbackWorked = function(result, response, callbackWorkedFunction) {
        if(callbackWorkedFunction) {
            callbackWorkedFunction(result, response);
        }
    };
    Hison.link.custom.callbackError = function(error, callbackErrorFunction) {
        if(callbackErrorFunction) {
            callbackErrorFunction(error);
        }
    };
} else {
    var Hison = {
        link : {
            custom : {
                rootUrl : 'http://localhost:8081/',
                controllerPath : 'api',
                timeout : 5000,
                BeforeGetRequst : function(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
                    return requestFunc(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options);
                },
                BeforePostRequst : function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
                    return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
                },
                BeforePutRequst : function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
                    return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
                },
                BeforePatchRequst : function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
                    return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
                },
                BeforeDeleteRequst : function(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
                    return requestFunc(methodName, requestDw, callbackWorkedFunc, callbackErrorFunc, options);
                },
                callbackWorked : function(result, response, callbackWorkedFunction) {
                    if(callbackWorkedFunction) {
                        callbackWorkedFunction(result, response);
                    }
                },
                callbackError : function(error, callbackErrorFunction) {
                    if(callbackErrorFunction) {
                        callbackErrorFunction(error);
                    }
                },
            },
        },
    };
}
