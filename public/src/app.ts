/// <reference path="_all.ts" />

import * as angular from 'angular';
import {MainController} from './maincontroller';


// Creating main app module and MainController
angular
    .module('AirlineInsuranceApp', [])
    .controller('MainController', MainController);


// Bootstrap the angular AirlineInsuranceApp module
angular
    .bootstrap(document.documentElement, ['AirlineInsuranceApp']);



