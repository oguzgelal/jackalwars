// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
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
	constructor($scope){
		$scope.viewModel(this);
		this.helpers({
		});

		$scope.game = new Game();
		$scope.game.init();
	}
}

export default angular.module('gameScreen', [angularMeteor])
.component('gameScreen', {
	templateUrl: template,
	controller: ['$scope', GameScreenCtrl]
})
.directive('gameMap', function(){
	return { restrict: 'E', templateUrl: gameMapTemplate };
})
.directive('infoArea', function(){
	return { restrict: 'E', templateUrl: infoAreaTemplate };
})
.directive('chatArea', function(){
	return { restrict: 'E', templateUrl: chatAreaTemplate };
})
.directive('historyArea', function(){
	return { restrict: 'E', templateUrl: historyAreaTemplate };
})
.directive('playerArea', function(){
	return { restrict: 'E', templateUrl: playerAreaTemplate };
})
.directive('controlArea', function(){
	return { restrict: 'E', templateUrl: controlAreaTemplate };
});