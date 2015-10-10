angular.module('dentist.reglements')
    .directive('addReglement', _addReglement );

function _addReglement(){
    function _controller($stateParams , $scope , reglements , getCurrentDateTime , praticiens , $filter , $rootScope){
        $scope.commenter = {};
        $scope.save = function(reglement){

            if(!reglement.amount) return 0;

            $scope.startSpin();

            if(reglement.time == null && reglement.date == null ){
                var t = getCurrentDateTime();

                reglements.new(reglement , $stateParams.id , praticiens.getCurrent().id , t)
                    .then(success(praticiens.getCurrent().id,t),error());

            }else{
                //todo if the user add custom date
            }
        };

        function success(p,t){

            var item = {};
            item.type = "reglement";
            item.label = $scope.reglement.amount;
            t = Date.parse(t);
            item.created_at = $filter('date')(t);
            item.praticien_id = p;
            //todo order
            $rootScope.list.push(item);

            $scope.reglement = {};
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