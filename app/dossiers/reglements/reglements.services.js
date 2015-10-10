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


    return{
        new: _new
    }
}