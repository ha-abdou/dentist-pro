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
                    if(err) console.log(err);

                    deferred.resolve(rows);
                    //setTimeout(function(){deferred.resolve(rows);}, 500)

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
    .factory('toSqlDate' , function(){
        return function(date){
            Date.prototype.yyyymmdd = function() {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = this.getDate().toString();
                return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0" + dd[0]); // padding
            };
            if(!date){
                return "0000-00-00";
            }
            return date.yyyymmdd();
        }
    })
    .factory('getCurrentDateTime',function(toSqlDateTime){
        return function(){
            return toSqlDateTime(new Date());
        }
    })
    .factory('getCurrentDate',function(toSqlDate){
        return function(){
            return toSqlDate(new Date());
        }
    })
    .factory('toSqlDateTime',function(){
        return function(date){
            Date.prototype.yyyymmddhhmmss = function() {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = this.getDate().toString();
                var h = this.getHours().toString();
                var m = this.getMinutes().toString();
                var s = this.getSeconds().toString();

                return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0" + dd[0]) +
                        " " + (h[1]?h:"0"+h[0]) + ":" + (m[1]?m:"0"+m[0]) + ":" + (s[1]?s:"0"+s[0])
                    ; // padding
            };
            if(!date){
                return "0000-00-00 00:00:00";
            }
            return date.yyyymmddhhmmss();
        }
    })
;