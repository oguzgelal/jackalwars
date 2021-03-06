import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import '../imports/startup/accounts-config.js';
// import services
import Auth from '../imports/services/auth.js';
// import components
import homeScreen from '../imports/components/homeScreen/homeScreen';
import gameScreen from '../imports/components/gameScreen/gameScreen';
import lobbyScreen from '../imports/components/lobbyScreen/lobbyScreen';
import loginScreen from '../imports/components/loginScreen/loginScreen';

class MainCtrl {
	constructor($scope){
	}
}

angular.module('jackal-wars', [
	angularMeteor,
	uiRouter,
	'accounts.ui',
	homeScreen.name,
	gameScreen.name,
	lobbyScreen.name,
	loginScreen.name
	])
// routing config
.config(function($locationProvider, $urlRouterProvider){
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
})
// services
.factory('auth', () => { return new Auth(); })
// run block
.run(function($rootScope){})
// main controller
.controller('MainCtrl', ['$scope', MainCtrl]);