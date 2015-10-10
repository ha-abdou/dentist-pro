angular.module('dentist.reglements')
    .directive('addReglement', _addReglement );

function _addReglement(){
    function _controller($stateParams , $scope , reglements , getCurrentDateTime , praticiens){

        $scope.save = function(reglement){

            if(!reglement.amount) return 0;

            $scope.startSpin();

            if(reglement.time == null && reglement.date == null ){

                reglements.new(reglement , $stateParams.id , praticiens.getCurrent().id , getCurrentDateTime() )
                    .then(success(),error());

            }else{
                //todo if the user add custom date
            }
        };

        function success(){
            $('#add-reglement').modal('hide');
            $scope.stopSpin();
        }

        function error(){
            //todo alert error
            $('#add-reglement').modal('hide');
            $scope.stopSpin();
        }
    }

    return {
        templateUrl: 'app/dossiers/reglements/form.html',
        controller: _controller
    };
}