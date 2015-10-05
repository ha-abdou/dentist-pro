angular.module('dentist.db')
    .factory('connections',function($q){
        var connection = "null";

        return{
            query: function(q){
                var deferred = $q.defer();

                //if not connected start new connection
                if(connection == "null"){
                    connection = mysql.createConnection({
                        host     : 'localhost',
                        user     : 'root',
                        password : 'root',
                        database : 'dentist'
                    });
                    connection.connect(function(err) {
                        if (err) {
                            console.error('error connecting: ' + err.stack);
                            connection = "null";
                            deferred.reject();
                            //return;
                        }
                        // console.log('connected as id ' + connection.threadId);
                    });
                }

                console.log(q);
                connection.query(q, function(err, rows) {
                    console.log(err);
                    // todo remove on prod
                    //deferred.resolve(rows);
                    setTimeout(function(){deferred.resolve(rows);}, 500)

                });

                return deferred.promise;
            },
            start: function(){
                //new promise
                var deferred = $q.defer();
                //start mysql server
                exec('cd ' + process.cwd() + '\\server && UniController.exe start_mysql')
                    .then(function (result) {
                        console.log('server start');
                        //server is running
                        deferred.resolve(true);
                    })
                    .fail(function (err) {
                        //fail to start the server
                        console.error('ERROR: ', err);
                        deferred.reject(false);
                    });
                //return promise
                return deferred.promise;
            },
            kill: function(){
                //new promise
                var deferred = $q.defer();
                exec('cd ' + process.cwd() + '\\server && UniController.exe stop_mysql')
                    .then(function (result) {
                        deferred.resolve(true);
                        console.log('server stop');
                    })
                    .fail(function (err) {
                        console.error('ERROR: ', err);
                        deferred.reject(false);
                    });
                //return deferred.promise;
                return deferred.promise;
            }

        };

    })

    .factory('toSqlSafe' , function(){
        return  function(str){return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')};
    })
;