var exec  = require('child-process-promise').exec;
var mysql = require('mysql');

var dentist = angular.module('dentist',
    [
        'ngAnimate',

        'ui.router','angularSpinner',

        'dentist.menus','dentist.statistics','dentist.praticiens','dentist.db'

    ]
);
