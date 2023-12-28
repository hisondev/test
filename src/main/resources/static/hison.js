var Hison ={};
(function() {
    Hison.data = {};
    Hison.data.convertObject = function(object) {
        return object;
    }

    Hison.link = {};
    Hison.link.protocol = "http://"
    Hison.link.domain = 'localhost:8081/';
    Hison.link.controllerPath = 'api';
    Hison.link.timeout = 5000;
    Hison.link.beforeGetRequst = function(resourcePath, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePostRequst = function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePutRequst = function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePatchRequst = function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeDeleteRequst = function(requestDw, beforeCallbackWorkedFunc, beforeCallbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeCallbackWorked = function(result, response) {
        return true;
    };
    Hison.link.beforeCallbackError = function(error) {
        return true;
    };

    Hison.caching = {};
    Hison.caching.isUsing = true;
    Hison.caching.protocol = "ws://";
    Hison.caching.wsEndPoint = "/caching-websocket-endpoint";
    Hison.caching.limit = 10;
})();
