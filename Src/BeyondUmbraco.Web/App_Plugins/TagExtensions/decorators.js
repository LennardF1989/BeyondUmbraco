angular.module("umbraco.directives").config(function ($provide) {
    $provide.decorator("umbTagsEditorDirective", function ($delegate) {
        var directive = $delegate[0];

        var originalController = directive.controller;

        directive.controller = function ($rootScope, assetsService, umbRequestHelper, angularHelper, $timeout, $element) {
            //originalController.call(this, $rootScope, assetsService, umbRequestHelper, angularHelper, $timeout, $element);
            originalController.apply(this, arguments);

            //NOTE: Copied from umbtagseditor.directive.js
            this.addTagOnEnter = function(e) {
                var code = e.keyCode || e.which;

                if (code === 13) {
                    var vm = this;

                    if ($element.find(".tags-" + vm.inputId).parent().find(".tt-menu .tt-cursor").length === 0) {
                        e.preventDefault();

                        vm.addTag();
                    }
                }
            }

            var originalAddTag = this.addTag;

            this.addTag = function() {
                var vm = this;

                vm.tagToAdd
                    .split(" ")
                    .forEach(x => addSingleTag(x));

                function addSingleTag(x) {
                    vm.tagToAdd = x;
                    originalAddTag();
                }
            };
        };

        return $delegate;
    });
});