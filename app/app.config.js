dentist.config(function($stateProvider , $urlRouterProvider , usSpinnerConfigProvider) {
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
        });

        //todo dossier state

    $urlRouterProvider.otherwise("/index");

});
