/**
 * @table : options
 * @fileds : id , label , type , option_id , patient_id , raticien_id , created_at
 * @author : abdou
 */

angular.module('dentist.reglements')
    .factory('reglements', _reglements);

function _reglements($q,connections){
    function _new(reglement,patient_id,praticien_id,datetime) {
        var query =
            "INSERT INTO options (`label`, `type`, `option_id`, `patient_id`, `praticien_id`, `created_at`) " +
            "VALUES ('" +
            reglement.amount + "', '" +
            "reglement' , '" +
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

    function _getReglement(id){
        var query = "SELECT SUM(label) as total " +
            "FROM options " +
            "WHERE type='reglement' AND patient_id='" + id + "'" +
            ";";

        var deferred = $q.defer();

        connections.query(query)
            .then(
            function(rows){
                var r = rows[0].total;
                deferred.resolve(r ? r : 0);
            },
            function(){
                //error
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function _upDateReglement(reglement){
        var query =
            "UPDATE options SET " +
            "`label` = '" + reglement.amount + "' ," +
            "`created_at` = '" + reglement.created_at + "' " +
            "WHERE `id` = " + reglement.id ;
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
        new: _new,
        getReglement: _getReglement,
        upDateReglement: _upDateReglement
    }
}