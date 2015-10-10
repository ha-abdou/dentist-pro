angular.module('dentist.dossier')

    .controller('HomeCtrl',function($scope , dossiers , $stateParams , $rootScope){
        $scope.startSpin();

        dossiers.getById($stateParams.id).then(
            function(dossier){
                $scope.dossier = dossier;
                _getLastAction();
            },function(){
                $scope.stopSpin();
            }
        );

        function _getLastAction(){
            dossiers.getRelativeAction($stateParams.id).then(
                function(rows){
                    $rootScope.list = rows ;
                    $scope.stopSpin();
                },
                function(){
                    $scope.stopSpin();
                }
            );
        }

    })

    .controller('NewCtrl',function($scope , dossiers ,$state){
        $scope.save = function(user){
            $scope.startSpin();
            dossiers.new(user).then(
                function(user_id){
                    $state.go('get_dossier',{id: user_id});
                    $scope.stopSpin();
                },
                function(){
                    $scope.stopSpin();

                }
            )
        }
    })


;