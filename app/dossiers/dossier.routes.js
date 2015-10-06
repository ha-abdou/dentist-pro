angular.module('dentist.dossier')
    .config(function($stateProvider){
        $stateProvider

            .state('dossier_add',{
                parent: 'dossier',
                url: '/add',
                templateUrl: "app/dossiers/add.html",
                controller: 'NewCtrl'
            })

        ;
    }

);