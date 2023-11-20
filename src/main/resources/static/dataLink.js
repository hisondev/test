var newDataLink = (function() {
    function DataLink() {
        this.get = function(cmd, dataModel) {

        }
    }
})();

// !function() {
//     var getMethods = (function() {
//         function Methods() {
//             this.datamodel.convertObject = function(object) {
//                 return object;
//             }
//         }
//         return function() {
//             return new Methods();
//         };
//     })();
    
//     var setMethods = (function(hison) {
//         var methods = getMethods();
//         hison.datamodel.convertObject = methods.datamodel.convertObject;
//         return;
//     })();
// }();

// getMethods = null;
// setMethods = null;