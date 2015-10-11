angular.module('dentist.soins')
    .factory('soins', _soins);

function _soins($q,connections){
    function _new(soin,patient_id,praticien_id,datetime) {
        var query =
            "INSERT INTO soins (`amount`) VALUES ('" + soin.amount + "') ;" ;

        var deferred = $q.defer();

        connections.query(query)
            .then(
            function(rows){
                connections.query(
                    "INSERT INTO options (`label`, `type`, `option_id`, `patient_id`, `praticien_id`, `created_at`) " +
                    "VALUES ('" +
                    soin.label + "', '" +
                    "soin' , '" +
                    rows.insertId + "', '" +
                    patient_id + "', '" +
                    praticien_id + "', '" +
                    datetime + "'" +
                    ");")
                    .then(
                        function(){
                            deferred.resolve(rows);
                        })
                ;


            },
            function(){
                //error
                deferred.reject();
            }
        );
        return deferred.promise;
    }


    function _getAmount(id){
        var query =
            "SELECT SUM(soins.amount) as total FROM options " +
            "INNER JOIN soins " +
            "ON options.option_id=soins.id " +
            "WHERE options.patient_id='" + id + "'" +
            ";";

        var deferred = $q.defer();

        connections.query(query)
            .then(
            function(rows){
                var r = rows[0].total;
                deferred.resolve(r ? r : 0 );
            },
            function(){
                //error
                deferred.reject();
            }
        );
        return deferred.promise;
    }


    return{
        new: _new ,
        getAmount: _getAmount
    }
}