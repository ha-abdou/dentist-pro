angular.module('dentist.reglements')
    .factory('reglements',function($q,getCurrentDateTime,connections){
        return{
            new: function(reglement,patient_id,praticien_id,datetime){
                var query =
                    "INSERT INTO options (`label`, `type`, `option_id`, `patient_id`, `praticien_id`, `created_at`) " +
                    "VALUES ('" +
                    reglement.amount + "', '" +
                    "reglements' , '" +
                    "0' , '" +
                    patient_id + "', '" +
                    praticien_id + "', '" +
                    datetime + "'" +
                    ")";

                var deferred = $q.defer();

                connections.query(query)
                    .then(
                    function(rows){
                        deferred.resolve(rows.insertId);
                    },
                    function(){
                        //error
                        deferred.reject();
                    }
                );
                return deferred.promise;
            }
        }
    })
;