// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
// Models
import Game from '../../models/game.js'
// Templates
import template from './lobbyScreen.html';
import onlineAreaTemplate from './onlineArea/onlineArea.html';

class LobbyScreenCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		this.helpers({
			
		});
	}
}

export default angular.module('lobbyScreen', [angularMeteor, uiRouter])
.component('lobbyScreen', {
	templateUrl: template,
	controller: ['$scope', LobbyScreenCtrl]
})
.config(function($stateProvider){
	$stateProvider.state('lobby', {
		url: '/lobby',
		template: '<lobby-screen></lobby-screen>'
	});
})
.directive('onlineArea', function() {
	return {
		restrict: 'E',
		templateUrl: onlineAreaTemplate
	};
});