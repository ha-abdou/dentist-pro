/**
 * @table : praticiens
 * @fields : id , name , last_name , tel
 * @author : abdou
 * @description : factory for practiciens
 * @todo update current_praticien on edit praticien
 */

angular.module('dentist.praticiens')
    .factory('praticiens',function($q,connections,toSqlSafe,$cookies){

       return{
           upDate: function(user){
               var query =
                   "UPDATE praticiens SET " +
                   "name='"   + toSqlSafe(user.name) + "',"+
                   "last_name='" + toSqlSafe(user.last_name) + "',"+
                   "tel='"    + user.tel + "'"+
                   "WHERE id=" + user.id ;

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
           getById: function(id) {
               var deferred = $q.defer();

               connections.query("SELECT * FROM `praticiens` WHERE `id` = " + id )
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
           all: function(){
               var deferred = $q.defer();
               connections.query('SELECT * FROM praticiens')
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
           new: function(user){
               var query =
                   "INSERT INTO praticiens (name, last_name, tel) " +
                   "VALUES ('" + toSqlSafe(user.name) + "', '" + toSqlSafe(user.last_name) + "', '" + user.tel + "')";

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
           delete: function(id){
               var query = "DELETE FROM praticiens WHERE id = '" + id + "'";
               var deferred = $q.defer();

               if(this.getCurrent().id == id){
                   alert('Please login from another account and delete yours');
                   deferred.reject();
               }else{
                   connections.query(query)
                       .then(
                       function(rows){
                           deferred.resolve();
                       },
                       function(){
                           //error
                           deferred.reject();
                       }
                   );
               }
               return deferred.promise;
           },
           getCurrent: function (){
               return $cookies.getObject('current_praticien') ? $cookies.getObject('current_praticien') : {};
           },
           setCurrent: function (praticien){
               $cookies.putObject('current_praticien',praticien);
               return 1;
           }

       }
    });