var Hison ={};
(function() {
    Hison.data = {};
    Hison.data.convertObject = function(object) {
        return object;
    }

    Hison.link = {};
    Hison.link.protocol = 'http://';
    Hison.link.domain = 'localhost:8081';
    Hison.link.controllerPath = '/hison-api-link';
    Hison.link.timeout = 10000;
    Hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePostRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePutRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePatchRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeDeleteRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeCallbackWorked = function(result, response) {
        return true;
    };
    Hison.link.beforeCallbackError = function(error) {
        return true;
    };

    Hison.caching = {};
    Hison.caching.protocol = 'ws://';
    Hison.caching.wsEndPoint = '/hison-caching-websocket-endpoint';
    Hison.caching.limit = 10;
})();
