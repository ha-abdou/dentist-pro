angular.module('dentist.menus')
    .config(function($stateProvider ) {

        $stateProvider
            .state('test', {
                parent: 'index',
                url: "/test",
                template: "<p>test</p>"
            });


    });