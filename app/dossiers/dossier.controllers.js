angular.module('dentist.dossier')

    .controller('MainDossierCtrl',function(){

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