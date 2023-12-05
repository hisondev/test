var Hison ={};
(function() {
    Hison.custom.data = {};
    Hison.custom.data.convertObject = function(object) {
        return object;
    }

    Hison.custom.link = {};
    Hison.custom.link.rootUrl = 'http://localhost:8081/';
    Hison.custom.link.controllerPath = 'api';
    Hison.custom.link.callbackError = function(error, _dw, callbackErrorFunc) {
        console.log('error', error);
        if(callbackErrorFunc) {
            callbackErrorFunc(error, _dw);
        }
    };
})();
