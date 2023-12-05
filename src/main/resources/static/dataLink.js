var newDataLink = (function() {
    function DataLink(cmd) {
        var _cmd;
        var _rootUrl = Hison.custom.link.rootUrl;
        var _controllerPath = Hison.custom.link.controllerPath;
        var _callbackErrorFunc = Hison.custom.link.callbackError;
        
        var _vaildCheck = function(dw, callbackWorkedFunc, callbackErrorFunc) {
            if (!_cmd) {
                throw new Error("Command not specified");
            }
            if(dw && (!(dw.getType) || dw.getType() !== 'datawrapper')) {
                throw new Error("Please insert only a valid data type.");
            }
            if (callbackWorkedFunc !== null && typeof callbackWorkedFunc !== 'function') {
                throw new Error("callbackWorkedFunc must be a function");
            }
            if (callbackErrorFunc !== null && typeof callbackErrorFunc !== 'function') {
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
            .then(response => response.json())
            .then(result => {
                if(!callbackWorkedFunc) return;
                var resultDw = null;
                if(result) {
                    resultDw = newDataWrapper();
                    for(var key of Object.keys(result)) {
                        if (result[key].constructor === Object || result[key].constructor === Array) {
                            resultDw.putDataModel(key, newDataModel(result[key]));
                        } else {
                            resultDw.put(key, result[key]);
                        }
                    }
                }
                callbackWorkedFunc(resultDw, dw);
            })
            .catch(error => _callbackErrorFunc(error, dw, callbackErrorFunc));
        };

        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc) {
            _vaildCheck(null, callbackWorkedFunc, callbackErrorFunc);

            var url = _rootUrl + resourcePath;
            fetch(url)
            .then(response => response.json())
            .then(result => callbackWorkedFunc(result))
            .catch(error => _callbackErrorFunc(error, dataWrapper, callbackErrorFunc));
        };

        this.post = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc) {
            _request('POST', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc);
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
    Hison.custom.link.rootUrl = 'http://localhost:8081/';
    Hison.custom.link.controllerPath = 'api';
    Hison.custom.link.callbackError = function(error, requestDataWrapper, callbackErrorFunction) {
        console.log('error', error);
        if(callbackErrorFunction) {
            callbackErrorFunction(error, requestDataWrapper);
        }
    };
} else {
    var Hison = {
        custom : {
            link : {
                rootUrl : 'http://localhost:8081/',
                controllerPath : 'api',
            },
            callbackError : function(error, requestDataWrapper, callbackErrorFunction) {
                console.log('error', error);
                if(callbackErrorFunction) {
                    callbackErrorFunction(error, requestDataWrapper);
                }
            },
        },
    };
}
