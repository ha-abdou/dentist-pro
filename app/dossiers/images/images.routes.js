angular.module('dentist.images')
    .config(function($stateProvider){
        $stateProvider

            .state('images',{
                url: '/dossier/:id/images',
                templateUrl: "app/dossiers/images/list.html",
                controller: 'imgListCtrl'
            })

        ;
    }
);