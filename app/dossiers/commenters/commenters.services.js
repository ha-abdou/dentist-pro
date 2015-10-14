angular.module('dentist.commenters')
    .factory('commenters',_commenters);

function _commenters($q , connections , toSqlSafe) {
    function _new(commenter,patient_id,praticien_id,datetime){
        var query =
            "INSERT INTO options (`label`, `type`, `option_id`, `patient_id`, `praticien_id`, `created_at`) " +
            "VALUES ('" +
            toSqlSafe(commenter.label) + "', '" +
            "commenter' , '" +
            "0' , '" +
            patient_id + "', '" +
            praticien_id + "', '" +
            datetime + "'" +
            ")";

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

    function _upDateCommenter(commenter){
        var query =
            "UPDATE options SET " +
            "`label` = '" + commenter.label + "' ," +
            "`created_at` = '" + commenter.created_at + "' " +
            "WHERE `id` = " + commenter.id ;
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


    return{
        new : _new ,
        upDateCommenter: _upDateCommenter
    }
}