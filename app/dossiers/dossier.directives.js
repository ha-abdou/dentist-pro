angular.module('dentist.dossier')
    .directive('searchDossier',function(){
        return{
            templateUrl: 'app/dossiers/search.html',
            controller: function($scope , dossiers , $stateParams){
                $scope.startSpin();

                dossiers.all().then(
                    function(rows){
                        $scope.dossiers = rows;
                        if($stateParams.id){
                            $scope.search = {};
                            $scope.search.id = $stateParams.id;
                        }
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