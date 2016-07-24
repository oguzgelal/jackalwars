import angular from 'angular';
import angularMeteor from 'angular-meteor';
import '../imports/startup/accounts-config.js';
// import services
import Auth from '../imports/services/auth.js';
// import components
import gameScreen from '../imports/components/gameScreen/gameScreen';
import lobbyScreen from '../imports/components/lobbyScreen/lobbyScreen';
import loginScreen from '../imports/components/loginScreen/loginScreen';

class MainCtrl {
	constructor($scope){
		$scope.user = Meteor.user();
		
	}
}

angular.module('jackal-wars', [
	angularMeteor,
	'accounts.ui',
	gameScreen.name,
	lobbyScreen.name,
	loginScreen.name
	])
// services
.factory('auth', () => { return new Auth(); })
// run block
.run(function($rootScope){})
// main controller
.controller('MainCtrl', ['$scope', MainCtrl]);