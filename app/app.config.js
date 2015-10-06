dentist.config(function($stateProvider , $urlRouterProvider , usSpinnerConfigProvider ) {
    usSpinnerConfigProvider.setDefaults({color: '#fafafa'});
    $stateProvider

        .state('login',{
            parent: 'index',
            url: '/login',
            templateUrl: "app/praticiens/login.html",
            controller: 'LoginCtrl'
        })

        .state('index', {
            url: "/index",
            templateUrl: "app/menus/main_menu.html",
            controller: 'MainCtrl'
        })

        .state('dossier', {
            url: "/dossier",
            templateUrl: "app/menus/dossier_menu.html",
            controller: 'MainDossierCtrl'
        })

        .state('search_dossier', {
            parent: "index",
            url: "/search_dossier",
            template: "<search_dossier></search_dossier>"
        })

    ;

    $urlRouterProvider.otherwise("/index");

});
