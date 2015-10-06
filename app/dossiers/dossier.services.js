angular.module('dentist.dossier')
    .factory('dossiers',function($q , connections){

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
            }
        }
    }
);