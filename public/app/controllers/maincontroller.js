System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MainController;
    return {
        setters:[],
        execute: function() {
            MainController = (function () {
                function MainController() {
                    this.message = "Hello AngularJS, TypeScript & SystemJS";
                }
                return MainController;
            }());
            exports_1("MainController", MainController);
        }
    }
});
//# sourceMappingURL=maincontroller.js.map