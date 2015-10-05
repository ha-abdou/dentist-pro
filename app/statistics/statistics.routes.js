angular.module('dentist.statistics')
    .config(function($stateProvider ) {

        $stateProvider
            .state('recette', {
                parent: 'index',
                url: "/statistics/recette",
                templateUrl: "app/statistics/recette.html"
            });


    });