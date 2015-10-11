angular.module('dentist.dossier')

    .controller('HomeCtrl',function($scope , dossiers , $stateParams , $rootScope , reglements , soins ){
        $scope.total_reglement = 0;
        $scope.total_soin = 0;
        $scope.startSpin();

        function _getDossier(){
            dossiers.getById($stateParams.id).then(
                function(dossier){
                    $scope.dossier = dossier;
                    $scope._dossier = $scope.dossier;
                    $scope._dossier.birthday = $scope._dossier.birthday == "0000-00-00" ? undefined : $scope._dossier.birthday;
                    _getLastAction();
                },function(){
                    $scope.stopSpin();
                }
            );
        }

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

        $rootScope.updateReglement = function(s) {
            reglements.getReglement($stateParams.id).then(function(r){
                $scope.total_reglement = r ;
            });
            //todo fix this bug on add soin directive
            if(s){
                $scope.total_soin += s ;
            }else{
                soins.getAmount($stateParams.id).then(function(r){
                    $scope.total_soin = r ;
                });
            }

        };

        _getDossier();
        $rootScope.updateReglement();



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