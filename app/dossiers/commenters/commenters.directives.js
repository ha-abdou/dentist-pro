angular.module('dentist.commenters')
    .directive('addCommenter' , _addCommenter)
    .directive('editCommenter' , _editCommenter);

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

            $scope._getLastAction();

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

function _editCommenter(){
    function _controller($scope , commenters , Time){

        $scope.update_commenter = function(commenter){

            if(!commenter.label) return 0;

            $scope.startSpin();

            commenter.created_at = Time.created_at(commenter.date ,commenter.time);

            commenters.upDateCommenter(commenter).then(
                function(){
                    $('#edit-commenter').modal('hide');
                    $scope._commenter = {};
                    $scope._getLastAction();
                    $scope.stopSpin();
                },
                function(){
                    //todo alert error
                    $scope.stopSpin();
                }
            );

        };

    }

    return {
        templateUrl: 'app/dossiers/commenters/edit.html',
        controller: _controller
    };
}