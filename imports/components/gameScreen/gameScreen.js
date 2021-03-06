// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularDragula from 'angular-dragula';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
// Models
import Game from '../../models/game.js'
// Templates
import template from './gameScreen.html';
import gameMapTemplate from './gameMap/gameMap.html';
import infoAreaTemplate from './infoArea/infoArea.html';
import chatAreaTemplate from './chatArea/chatArea.html';
import historyAreaTemplate from './historyArea/historyArea.html';
import playerAreaTemplate from './playerArea/playerArea.html';
import controlAreaTemplate from './controlArea/controlArea.html';

class GameScreenCtrl {
	constructor($scope, $timeout, dragulaService) {
		$scope.viewModel(this);
		this.helpers({});

		$scope.game = new Game();
		$scope.game.init();

		this.dragulaOptions($scope, dragulaService);
	}

	dragulaOptions($scope, dragulaService) {
		dragulaService.options($scope, 'gs-drop-col', {
			moves: function(el, container, handle){
				return handle.className.indexOf('gs-drag-handle') !== -1;
			}
		});
	}
}

export default angular.module('gameScreen', [angularMeteor, angularDragula(angular), uiRouter])
.component('gameScreen', {
	templateUrl: template,
	controller: ['$scope', '$timeout', 'dragulaService', GameScreenCtrl]
})
.config(function($stateProvider){
	$stateProvider.state('game', {
		url: '/game',
		template: '<game-screen></game-screen>'
	});
})
.directive('gameMap', function() {
	return {
		restrict: 'E',
		templateUrl: gameMapTemplate
	};
})
.directive('infoArea', function() {
	return {
		restrict: 'E',
		templateUrl: infoAreaTemplate
	};
})
.directive('chatArea', function() {
	return {
		restrict: 'E',
		templateUrl: chatAreaTemplate
	};
})
.directive('historyArea', function() {
	return {
		restrict: 'E',
		templateUrl: historyAreaTemplate
	};
})
.directive('playerArea', function() {
	return {
		restrict: 'E',
		templateUrl: playerAreaTemplate
	};
})
.directive('controlArea', function() {
	return {
		restrict: 'E',
		templateUrl: controlAreaTemplate
	};
});