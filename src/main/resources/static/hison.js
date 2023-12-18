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
    Hison.link.custom.callbackError = function(error, requestDataWrapper, callbackErrorFunction) {
        console.log('error', error);
        if(callbackErrorFunction) {
            callbackErrorFunction(error, requestDataWrapper);
        }
    };
})();
