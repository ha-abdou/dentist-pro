angular.module('dentist.commenters')
    .directive('addCommenter' , _addCommenter);

function _addCommenter (){
    function _controller($stateParams , $scope , commenters , getCurrentDateTime , praticiens , $filter , $rootScope){

        $scope.save_commenter = function(commenter){

            if(!commenter.label) return 0;

            $scope.startSpin();

            if(commenter.time == null && commenter.date == null ){
                var t = getCurrentDateTime();

                commenters.new(commenter , $stateParams.id , praticiens.getCurrent().id , t)
                    .then(success(praticiens.getCurrent().id,t),error());

            }else{
                //todo if the user add custom date
            }
        };

        function success(p,t){

            var item = {};
            item.type = "commenter";
            item.label = $scope.commenter.label;
            t = Date.parse(t);
            item.created_at = $filter('date')(t);
            item.praticien_id = p;
            //todo order
            $rootScope.list.push(item);

            $scope.commenter = {};
            $('#add-commenter').modal('hide');
            $scope.stopSpin();

        }

        function error(){
            //todo alert error
            $('#add-commenter').modal('hide');
            $scope.stopSpin();
        }
    }

    return{
        templateUrl: 'app/dossiers/commenters/form.html',
        controller: _controller
    }
}