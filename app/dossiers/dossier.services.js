angular.module('dentist.dossier')
    .factory('dossiers',function($q , connections , toSqlSafe , toSqlDate , getCurrentDateTime){

        return {
            all: function(){
                var deferred = $q.defer();
                connections.query('SELECT id,name,last_name,birthday FROM patients')
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
            },
            new : function(patient){

                var query =
                    "INSERT INTO patients (`name`, `last_name`, `birthday`, `adresse`, `email`, `tel`,`created_at`) " +
                    "VALUES ('" +
                        toSqlSafe(patient.name) + "', '" +
                        toSqlSafe(patient.last_name) + "', '" +
                        toSqlDate(patient.birthday) + "', '" +
                        toSqlSafe(patient.adresse) + "', '" +
                        toSqlSafe(patient.email) + "', '" +
                        patient.tel + "', '" +
                        getCurrentDateTime() + "'" +
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
    }
);