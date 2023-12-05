var newDataLink = (function() {
    function DataLink(cmd, dw) {
        var _cmd;
        var _dw;
        var _rootUrl = Hison.custom.link.rootUrl;
        var _controllerPath = Hison.custom.link.controllerPath;
        var _callbackErrorFunc = Hison.custom.link.callbackError;
        
        var _vaildCheck = function(callbackWorkedFunc, callbackErrorFunc) {
            if (!_cmd) {
                throw new Error("Command not specified");
            }
            if(_dw && (!(_dw.getType) || _dw.getType !== 'datawrapper')) {
                throw new Error("Please insert only a valid data type.");
            }
            if (typeof callbackWorkedFunc !== 'function') {
                throw new Error("callbackWorkedFunc must be a function");
            }
            if (typeof callbackErrorFunc !== 'function') {
                throw new Error("callbackErrorFunc must be a function");
            }
        }

        var _getData = function() {
            var dw;
            if(_dw) {
                dw = _dw.clone();
                dw.putString('cmd',_cmd);
            } else {
                dw = newDataWrapper('cmd',_cmd);
            }
            return dw;
        }

        var _request = function(methodName, callbackWorkedFunc, callbackErrorFunc) {
            _vaildCheck(callbackWorkedFunc, callbackErrorFunc);
            var dw = _getData();

            fetch(_rootUrl + _controllerPath, {
                method: methodName,
                headers: {'Content-Type': 'application/json'},
                body: dw.getSerialized(),
            })
            .then(response => response.json())
            .then(result => callbackWorkedFunc(result, _dw))
            .catch(error => _callbackErrorFunc(error, _dw, callbackErrorFunc));
        };

        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc) {
            _vaildCheck(callbackWorkedFunc, callbackErrorFunc);

            var url = _rootUrl + resourcePath;
            fetch(url)
            .then(response => response.json())
            .then(result => callbackWorkedFunc(result))
            .catch(error => _callbackErrorFunc(error, callbackErrorFunc));
        }

        this.post = function(callbackWorkedFunc, callbackErrorFunc) {
            _request('POST', callbackWorkedFunc, callbackErrorFunc);
        }

        this.put = function(callbackWorkedFunc, callbackErrorFunc) {
            _request('PUT', callbackWorkedFunc, callbackErrorFunc);
        }

        this.patch = function(callbackWorkedFunc, callbackErrorFunc) {
            _request('PATCH', callbackWorkedFunc, callbackErrorFunc);
        }
        
        this.delete = function(callbackWorkedFunc, callbackErrorFunc) {
            _request('DELETE', callbackWorkedFunc, callbackErrorFunc);
        }

        this.putCmd = function() {};

        this.putDataWrapper = function() {};

        this.set = function() {};

        //create
        if (!cmd && !dw) {
            return;
        } else {
            _cmd = cmd;
            _dw = dw;
        }
    }
    return function(keyOrObject, value) {
        return new DataWrapper(keyOrObject, value);
    };
})();
if(Hison) {
    Hison.custom.link.rootUrl = 'http://localhost:8081/';
    Hison.custom.link.controllerPath = 'api';
    Hison.custom.link.callbackError = function(error, _dw, callbackErrorFunc) {
        console.log('error', error);
        if(callbackErrorFunc) {
            callbackErrorFunc(error, _dw);
        }
    };
} else {
    var Hison = {
        custom : {
            link : {
                rootUrl : 'http://localhost:8081/',
                controllerPath : 'api',
            },
            callbackError : function(error, _dw, callbackErrorFunc) {
                console.log('error', error);
                if(callbackErrorFunc) {
                    callbackErrorFunc(error, _dw);
                }
            },
        },
    };
}
