// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
// Models
import Game from '../../models/game.js'
// Templates
import template from './gameScreen.html';
import gameMapTemplate from './gameMap/gameMap.html';

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
	return {
		restrict: 'E',
		templateUrl: gameMapTemplate
	};
});