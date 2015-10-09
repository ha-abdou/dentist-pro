angular.module('dentist.dossier')

    .controller('HomeCtrl',function($scope , dossiers , $stateParams){
        $scope.startSpin();

        dossiers.getById($stateParams.id).then(
            function(dossier){
                $scope.dossier = dossier;
                $scope.stopSpin();
            },function(){
                $scope.stopSpin();
            }
        );



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