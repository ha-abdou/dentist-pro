angular.module('dentist.dossier')
    .config(function($stateProvider){
        $stateProvider

            .state('dossier_add',{
                parent: 'index',
                url: '/dossiers/add',
                templateUrl: "app/dossiers/form.html",
                controller: 'NewCtrl'
            })
            .state('search_dossier', {
                parent: "index",
                url: "/search_dossier",
                template: "<search_dossier></search_dossier>"
            })
            .state('get_dossier', {
                parent: "index",
                url: "/search_dossier/:id",
                template: "<search_dossier></search_dossier>"
            })

        ;
    }
);