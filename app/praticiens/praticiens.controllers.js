angular.module('dentist.praticiens')
    .controller('LoginCtrl',function($scope,connections){
        $scope.start = function(){

            connections.start()
        };
        $scope.kill = function(){

            connections.kill()
        }
    })
    .controller('ListCtrl',function($scope , praticiens ){
        $scope.startSpin();

        $scope.praticiens = [];

        praticiens.all().then(
            function(rows){
                $scope.praticiens = rows;
                $scope.stopSpin();
            },
            function(){
                //todo review the alert
                $scope.stopSpin();
            }
        );

        $scope.delete = function(praticien){
            $scope.startSpin();
            praticiens.delete(praticien.id).then(
                function(){
                    var index = $scope.praticiens.indexOf(praticien);
                    $scope.praticiens.splice(index, 1);
                    $scope.stopSpin();
                },
                function(){
                    //todo review the alert
                    $scope.stopSpin();
                }
            );

        }

    })

    .controller('NewCtrl',function($scope , praticiens, $state){
        $scope.title = "Ajoute Un Praticien :";
        $scope.save = function(user){
            $scope.startSpin();
            praticiens.new(user).then(
                function(id){

                    $scope.stopSpin();
                    $state.go('praticiens_view',{id: id});
                },
                function(){

                    $scope.stopSpin();
                    //todo review the alert
                    alert('ERROR: cant save');
                }
            );
        }
    })

    .controller('EditCtrl',function($scope , praticiens, $stateParams, $state){
        $scope.startSpin();
        $scope.user = { name: '', last_name: '' };

        praticiens.getById($stateParams.id).then(function(p){
            $scope.user = p;
            $scope.title = "Edit DR. " + $scope.user.name + " " + $scope.user.last_name;

            $scope.stopSpin();
        });

        $scope.save = function(user){
            $scope.startSpin();

            praticiens.upDate(user).then(
                function(rows){

                    $scope.stopSpin();
                    $state.go('praticiens_view',{id:$stateParams.id});
                },
                function(){

                    $scope.stopSpin();
                    //todo review the alert
                    alert('Cant be saved try again');
                }
            );
        }
    })

    .controller('ViewCtrl', function($scope,praticiens,$stateParams){
        $scope.startSpin();
        $scope.praticien = {};

        praticiens.getById($stateParams.id).then(
            function(user){
                $scope.praticien = user ;
                $scope.stopSpin();
            },
            function(){
                $scope.stopSpin();
                //todo review the alert
                alert('ERROR : Cant get User');
            }
        )
    })

;















