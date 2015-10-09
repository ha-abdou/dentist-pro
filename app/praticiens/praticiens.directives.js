angular.module('dentist.praticiens')
    .directive('changCurrentPraticien',function(praticiens,$state){
        return {
            templateUrl: "app/praticiens/chang.html",
            controller: function($scope,praticiens){
                $scope.startSpin();
                praticiens.all().then(
                    function(rows){
                        $scope.praticiens = rows;
                        $scope.stopSpin();
                    },
                    function(){
                        //todo alert error message
                        $scope.stopSpin();
                    }
                );

                $scope.switch = function(praticien){
                    praticiens.setCurrent(praticien);
                    $scope.setCurrent(praticien) ;
                    $state.go('search_dossier');
                };

            }
        }
    });