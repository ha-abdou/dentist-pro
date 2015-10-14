angular.module('dentist.dossier')

    .controller('HomeCtrl',function($scope , dossiers , $stateParams , $rootScope , reglements , soins ){
        /**
         *
         * @type {{}}
         * @private
         * @description date for edit reglement modal
         */
        $scope._reglement = {};
        $scope._commenter = {},
        $scope.total_reglement = 0;
        $scope.total_soin = 0;
        $scope.startSpin();

        $scope._getLastAction = function(){
            $scope.startSpin();
            dossiers.getRelativeAction($stateParams.id).then(
                function(rows){
                    $rootScope.list = rows ;
                    $scope.stopSpin();
                },
                function(){
                    $scope.stopSpin();
                }
            );
        };

        $scope.edit = function(item){

            if(item.type == 'reglement'){
                $scope._reglement.date = item.created_at;
                $scope._reglement.time = item.created_at;
                $scope._reglement.amount = parseInt(item.label);
                $scope._reglement.id = item.id;
                $('#edit-reglement').modal('show');
            }
            else if( item.type == 'commenter'){
                $scope._commenter.date = item.created_at;
                $scope._commenter.time = item.created_at;
                $scope._commenter.label = item.label;
                $scope._commenter.id = item.id;
                $('#edit-commenter').modal('show');

            }else if(item.type == 'soin'){

            }

        };

        function _getDossier(){
            dossiers.getById($stateParams.id).then(
                function(dossier){
                    $scope.dossier = dossier;
                    $scope._dossier = $scope.dossier;
                    $scope._dossier.birthday = $scope._dossier.birthday == "0000-00-00" ? undefined : $scope._dossier.birthday;
                    $scope._getLastAction();
                },function(){
                    $scope.stopSpin();
                }
            );
        }



        $rootScope.updateReglement = function(s) {
            reglements.getReglement($stateParams.id).then(function(r){
                $scope.total_reglement = r ;
            });
            //todo fix this bug on add soin directive
            if(s){
                $scope.total_soin += s ;
            }else{
                soins.getAmount($stateParams.id).then(function(r){
                    $scope.total_soin = r ;
                });
            }

        };

        _getDossier();
        $rootScope.updateReglement();



    })

    .controller('NewCtrl',function($scope , dossiers ,$state){
        $scope.save = function(user){
            $scope.startSpin();
            dossiers.new(user).then(
                function(rows){
                    $state.go('get_dossier',{id: rows.insertId});
                    $scope.stopSpin();
                },
                function(){
                    $scope.stopSpin();

                }
            )
        }
    })

;