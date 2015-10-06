angular.module('dentist.dossier')
    .directive('searchDossier',function(){
        return{
            templateUrl: 'app/dossiers/search.html',
            controller: function($scope , dossiers){
                $scope.startSpin();

                dossiers.all().then(
                    function(rows){
                        $scope.dossiers = rows;
                        $scope.stopSpin();
                    },
                    function(){
                        $scope.stopSpin();

                    }
                )
            }
        }
    })
;