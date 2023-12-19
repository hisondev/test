var Hison ={};
(function() {
    Hison.data = {};
    Hison.data.custom = {};
    Hison.data.custom.convertObject = function(object) {
        return object;
    }

    Hison.link = {};
    Hison.link.custom = {};
    Hison.link.custom.rootUrl = 'http://localhost:8081/';
    Hison.link.custom.controllerPath = 'api';
    Hison.link.custom.timeout = 5000;
    Hison.link.custom.BeforeGetRequst = function(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options, requestFunc) {
        return requestFunc(methodName, resourcePath, callbackWorkedFunc, callbackErrorFunc, options);
    }
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
    Hison.link.custom.callbackWorked = function(resultDw, response, callbackWorkedFunction) {
        if(callbackWorkedFunction) {
            callbackWorkedFunction(resultDw, response);
        }
    };
    Hison.link.custom.callbackError = function(error, callbackErrorFunction) {
        if(callbackErrorFunction) {
            callbackErrorFunction(error);
        }
    };
})();
