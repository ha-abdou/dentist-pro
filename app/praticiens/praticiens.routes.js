angular.module('dentist.praticiens')
    .config(function($stateProvider ) {

        $stateProvider
            .state('praticiens_list', {
                parent: 'index',
                url: "/praticiens/list",
                templateUrl: "app/praticiens/list.html",
                controller: 'ListCtrl'
            })
            .state('praticiens_new', {
                parent: 'index',
                url: "/praticiens/new",
                templateUrl: "app/praticiens/form.html",
                controller: 'NewCtrl'
            })
            .state('praticiens_chang', {
                parent: 'index',
                url: "/praticiens/chang",
                template: "<chang_current_praticien></chang_current_praticien>"
            })
            .state('praticiens_edit', {
                parent: 'index',
                url: "/praticiens/edit/:id",
                templateUrl: "app/praticiens/form.html",
                controller: 'EditCtrl'
            })
            .state('praticiens_view',{
                parent: 'index',
                url: '/praticiens/view/:id',
                templateUrl: "app/praticiens/view.html",
                controller: 'ViewCtrl'
            })
        ;


    });