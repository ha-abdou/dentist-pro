angular.module('dentist.statistics')
    .factory('recette',_recette);

function _recette($q,connections){
    function _get(from,to){
        var query =
            "SELECT * " +
            "FROM options " +
            "WHERE created_at " +
            "between " +
                "'" + from + "' " +
                "and " +
                "'" + to + "' " +
            "AND " +
                "type='reglement'"
            ;

        var deferred = $q.defer();

        connections.query(query)
            .then(
            function(rows){
                deferred.resolve(rows);
            },
            function(){
                //error
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function _getOf(date){
        var deferred = $q.defer();
        this.get( date + "  00:00:00" , date + ' 23:59:59').then(
            function(rows){
                deferred.resolve(rows);
            }
        );
        return deferred.promise;
    }

    return{
        get: _get ,
        getOf: _getOf
    }
}