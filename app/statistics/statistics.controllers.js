angular.module('dentist.statistics')
    .controller( 'recetteCtrl' , _recetteCtrl );

function _recetteCtrl($scope , recette , toSqlDate){
    $scope.total = 0 ;
    $scope.date = new Date ;

    $scope.update_date = function(date){
        setDate(date ? date : new Date);
    };

    function setDate(date){
        recette.getOf(toSqlDate(date)).then(function(r){
            $scope.list = r ;
            countTotal();
        });
    }

    function countTotal(){
        $scope.total = 0 ;
        for(var i = 0 ; i < $scope.list.length ; i++ ){
            $scope.total += $scope.list[i].label * 1;
        }
    }

    setDate($scope.date);

}
