angular.module('dentist.menus')
    .controller('MainCtrl' , function($scope , usSpinnerService , praticiens , $state){
        $scope.startSpin = function(){
            usSpinnerService.spin('spinner-1');
        };
        $scope.stopSpin = function(){
            usSpinnerService.stop('spinner-1');
        };

        $scope.current_praticien = "not login";

        $scope.setCurrent = function(praticien){
            $scope.current_praticien = "DR." + praticien.name + " " + praticien.last_name;

        };

        if (praticiens.getCurrent().id) {
            $scope.setCurrent(praticiens.getCurrent());
            $state.go('praticiens_list');
        } else {
            $state.go('login');
        }

    });