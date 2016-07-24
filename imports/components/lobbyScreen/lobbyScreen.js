// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
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

export default angular.module('lobbyScreen', [angularMeteor])
.component('lobbyScreen', {
	templateUrl: template,
	controller: ['$scope', LobbyScreenCtrl]
})
.directive('onlineArea', function() {
	return {
		restrict: 'E',
		templateUrl: onlineAreaTemplate
	};
});