angular.module("umbraco.directives").config(function ($provide) {
    $provide.decorator("umbNavigationDirective", function ($delegate) {
        var directive = $delegate[0];

        //Option 1
        //directive.template = directive.template.replace(
        //    /class="umb-language-picker" ng-if=".*?"/g, 
        //    "class=\"umb-language-picker\" ng-if=\"languages.length > 1\""
        //);

        //Option 2
        directive.template = directive.template.replace(
            "<div class=\"navigation-inner-container\">",
            "<div class=\"navigation-inner-container\"><div ng-include=\"'/App_Plugins/TreeExtensions/dropdown.html'\"></div>"
        );

        return $delegate;
    });
});

angular.module("umbraco").controller("BeyondUmbraco.TreeExtensions", function ($scope, notificationsService) {
    $scope.languages = [
        {
            name: 'Hello'
        },
        {
            name: 'Umbraco'
        }
    ];

    $scope.selectedLanguage = $scope.languages[0];

    $scope.selectLanguage = function (language) {
        $scope.selectedLanguage = language;
        $scope.page.languageSelectorIsOpen = false;

        notificationsService.success("You selected: " + language.name);
    }
});
