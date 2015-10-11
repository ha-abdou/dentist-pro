angular.module('dentist.soins')
    .directive('addSoin', _addSoin );

function _addSoin(){
    function _controller($stateParams , $scope , soins , getCurrentDateTime , praticiens , $filter , $rootScope){

        $scope.save_soin = function(soin){

            if(!soin.label) return 0;

            $scope.startSpin();

            if(soin.time == null && soin.date == null ){
                var t = getCurrentDateTime();

                soins.new(soin , $stateParams.id , praticiens.getCurrent().id , t)
                    .then(success(praticiens.getCurrent().id,t),error());

            }else{
                //todo if the user add custom date
            }
        };

        function success(p,t){
            $rootScope.updateReglement($scope.soin.amount);

            var item = {};
            item.type = "soin";
            item.label = $scope.soin.label;
            t = Date.parse(t);
            item.created_at = $filter('date')(t);
            item.praticien_id = p;
            //todo order
            $rootScope.list.push(item);

            $scope.soin = {};
            $('#add-soin').modal('hide');
            $scope.stopSpin();

        }

        function error(){
            //todo alert error
            $('#add-soin').modal('hide');
            $scope.stopSpin();
        }
    }

    return {
        templateUrl: 'app/dossiers/soins/form.html',
        controller: _controller
    };
}