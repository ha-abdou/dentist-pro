var exec  = require('child-process-promise').exec;
var mysql = require('mysql');
var fs = require('fs');
var gui = require('nw.gui');
//var path  = require('path');

var dentist = angular.module('dentist',
    [
        'ngAnimate',

        'ui.router','angularSpinner',

        'dentist.menus','dentist.statistics','dentist.praticiens','dentist.db','dentist.dossier','dentist.images'

    ]
);
