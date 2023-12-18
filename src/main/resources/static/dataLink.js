var newDataLink = (function() {
    function DataLink(cmd) {
        var _cmd;
        var _rootUrl = Hison.link.custom.rootUrl;
        var _controllerPath = Hison.link.custom.controllerPath;
        var _callbackErrorFunc = Hison.link.custom.callbackError;
        
        var _vaildCheck = function(dw, callbackWorkedFunc, callbackErrorFunc) {
            if (!_cmd) {
                throw new Error("Command not specified");
            }
            if(dw && (!(dw.getType) || dw.getType() !== 'datawrapper')) {
                throw new Error("Please insert only a valid data type.");
            }
            if (callbackWorkedFunc && typeof callbackWorkedFunc !== 'function') {
                throw new Error("callbackWorkedFunc must be a function");
            }
            if (callbackErrorFunc && typeof callbackErrorFunc !== 'function') {
                throw new Error("callbackErrorFunc must be a function");
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

        var _request = function(methodName, dw, callbackWorkedFunc, callbackErrorFunc) {
            _vaildCheck(dw, callbackWorkedFunc, callbackErrorFunc);
            var dw = _getDataWrapper(dw);

            fetch(_rootUrl + _controllerPath, {
                method: methodName,
                headers: {'Content-Type': 'application/json'},
                body: dw.getSerialized(),
            })
            .then(response => {
                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => ({ data: data, response: response })); // Process JSON format response
                } else if (contentType) {
                    return response.text().then(text => {
                        return { data: text ? text : null, response: response }; // Non-JSON format but with content
                    });
                } else {
                    return { data: null, response: response }; // No Content-Type header or empty response body
                }
            })
            .then(rtn => {
                if(!callbackWorkedFunc) return;
                var resultData = rtn.result;
                var resultDw = null;
                if(resultData && resultData.constructor === Object) {
                    resultDw = newDataWrapper();
                    for(var key of Object.keys(resultData)) {
                        if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                            resultDw.putDataModel(key, newDataModel(resultData[key]));
                        } else {
                            resultDw.put(key, resultData[key]);
                        }
                    }
                }
                callbackWorkedFunc(resultDw, rtn.response, dw);
            })
            .catch(error => _callbackErrorFunc(error, rtn.response, dw, callbackErrorFunc));
        };

        var _requestAsync = async function(methodName, dw, callbackErrorFunc) {
            var getRsultDw = function(resultData) {
                var resultDw = null;
                if(resultData && resultData.constructor === Object) {
                    resultDw = newDataWrapper();
                    for(var key of Object.keys(resultData)) {
                        if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                            resultDw.putDataModel(key, newDataModel(resultData[key]));
                        } else {
                            resultDw.put(key, resultData[key]);
                        }
                    }
                }
                return resultDw;
            }

            _vaildCheck(dw, null, callbackErrorFunc);
            var dw = _getDataWrapper(dw);
            var rtn = {};

            try {
                var response = await fetch(_rootUrl + _controllerPath, {
                    method: methodName,
                    headers: {'Content-Type': 'application/json'},
                    body: dw.getSerialized(),
                });
                rtn.response = response;

                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    var data = await response.json();
                    rtn.result = getRsultDw(data);
                    return rtn;
                } else if (contentType) {
                    var text = await response.text();
                    rtn.result = text;
                    return rtn;
                } else {
                    rtn.result = null;
                    return rtn;
                }
            } catch (error) {
                _callbackErrorFunc(error, rtn.response, dw, callbackErrorFunc)
            }
        };

        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc) {
            _vaildCheck(null, callbackWorkedFunc, callbackErrorFunc);

            var url = _rootUrl + resourcePath;
            fetch(url)
            .then(response => {
                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json(); // Process JSON format response
                } else if (contentType) {
                    return response.text().then(text => {
                        return text ? text : null; // Non-JSON format but with content
                    });
                } else {
                    return null; // No Content-Type header or empty response body
                }
            })
            .then(result => callbackWorkedFunc(result))
            .catch(error => _callbackErrorFunc(error, dataWrapper, callbackErrorFunc));
        };

        this.post = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc) {
            _request('POST', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc);
        };

        this.postAsync = function(requestDataWrapper, callbackErrorFunc) {
            return _requestAsync('POST', requestDataWrapper, callbackErrorFunc);
        };

        this.put = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc) {
            _request('PUT', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc);
        };

        this.patch = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc) {
            _request('PATCH', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc);
        };
        
        this.delete = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc) {
            _request('DELETE', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc);
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
    Hison.link.custom.callbackError = function(error, response, requestDataWrapper, callbackErrorFunction) {
        console.log('error', error);
        if(callbackErrorFunction) {
            callbackErrorFunction(error, response, requestDataWrapper);
        }
    };
} else {
    var Hison = {
        link : {
            custom : {
                rootUrl : 'http://localhost:8081/',
                controllerPath : 'api',
            },
            callbackError : function(error, response, requestDataWrapper, callbackErrorFunction) {
                console.log('error', error);
                if(callbackErrorFunction) {
                    callbackErrorFunction(error, response, requestDataWrapper);
                }
            },
        },
    };
}
