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

    .directive('editDossier',function(){
        return{
            templateUrl: 'app/dossiers/edit.html',
            controller: function($scope , dossiers){

                $scope.up_date = function(user){

                    $scope.startSpin();
                    dossiers.upDate(user).then(
                        function(){
                            $scope.dossier = angular.copy($scope._dossier);
                            $('#edit').modal('hide');
                            $scope.stopSpin();
                        },
                        function(){
                            $('#edit').modal('hide');
                            $scope.stopSpin();

                        }
                    )
                }


            }

        }
    })
;