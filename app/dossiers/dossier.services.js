angular.module('dentist.dossier')
    .factory('dossiers',function($q , connections , toSqlSafe , toSqlDate , getCurrentDateTime , toSqlDateTime){

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
            },
            upDate: function(patient){
                var query =
                    "UPDATE patients SET " +
                    "name='"   + toSqlSafe(patient.name) + "',"+
                    "last_name='" + toSqlSafe(patient.last_name) + "',"+
                    "birthday='" + toSqlDate(patient.birthday) + "',"+
                    "adresse='" + toSqlSafe(patient.adresse) + "',"+
                    "email='" + toSqlSafe(patient.email) + "',"+
                    "tel='"    + patient.tel + "'"+
                    "WHERE id=" + patient.id ;

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
            },
            getById: function(id){
                var query = "SELECT * FROM patients WHERE id='" + id + "'";

                var deferred = $q.defer();

                connections.query(query)
                    .then(
                    function(rows){
                        deferred.resolve(rows[0]);
                    },
                    function(){
                        //error
                        deferred.reject();
                    }
                );
                return deferred.promise;
            },
            getRelativeAction: function(id){
                var query = "SELECT * FROM options WHERE patient_id='" + id + "'";

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
        }
    }
);