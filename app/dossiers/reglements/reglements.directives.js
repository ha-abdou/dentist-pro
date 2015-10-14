angular.module('dentist.reglements')
    .directive('addReglement', _addReglement )
    .directive('editReglement', _editReglement );

function _addReglement(){
    function _controller($stateParams , $scope , reglements , getCurrentDateTime , praticiens , $filter , $rootScope , Time){
        $rootScope.reglement = {};

        $scope.save_reglement = function(reglement){

            if(!reglement.amount) return 0;

            $scope.startSpin();

            var dateTime = Time.created_at(reglement.date ,reglement.time) ;

            reglements.new(reglement , $stateParams.id , praticiens.getCurrent().id , dateTime)
                    .then(success(praticiens.getCurrent().id,dateTime),error());

        };

        function success(p,t){
            $rootScope.updateReglement();

            $scope._getLastAction();

            $rootScope.reglement = {};
            $('#add-reglement').modal('hide');
            $scope.stopSpin();

        }

        function error(){
            //todo alert error
            //$('#add-reglement').modal('hide');
            $scope.stopSpin();
        }
    }

    return {
        templateUrl: 'app/dossiers/reglements/form.html',
        controller: _controller
    };
}

function _editReglement(){
    function _controller($scope , reglements , $rootScope , Time){

        $scope.edit_reglement = function(reglement){

            if(!reglement.amount) return 0;

            $scope.startSpin();

            reglement.created_at = Time.created_at(reglement.date ,reglement.time);

            reglements.upDateReglement(reglement).then(
                function(){
                    $('#edit-reglement').modal('hide');
                    $scope._reglement = {};
                    $scope.stopSpin();
                    $scope._getLastAction();
                    $rootScope.updateReglement();
                },
                function(){
                    //todo alert error
                    $scope.stopSpin();
                }
            );

        };

        function success(){
            //todo reload
        }

        function error(){
            //todo alert error
            $('#edit-reglement').modal('hide');
            $scope.stopSpin();
        }
    }

    return {
        templateUrl: 'app/dossiers/reglements/edit.html',
        controller: _controller
    };
}























