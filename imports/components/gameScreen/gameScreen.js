import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './gameScreen.html';
import gameAreaTemplate from './gameArea/gameArea.html';
import { Meteor } from 'meteor/meteor';

class GameScreenCtrl {
	constructor($scope){
		$scope.viewModel(this);
		this.helpers({
		});

		$scope.mapRowCnt = 6;
		$scope.mapColCnt = 6;
		$scope.mapData = [];

		$scope.resetMap = function(){
			for (var i = 0; i < $scope.mapRowCnt; i++){
				$scope.mapData[i] = [];
				for (var j = 0; j < $scope.mapColCnt; j++){
					$scope.mapData[i][j] = { state: 'empty' };
				}
			}
		};

		$scope.resetMap();
	}
}

export default angular.module('gameScreen', [angularMeteor])
.component('gameScreen', {
	templateUrl: template,
	controller: ['$scope', GameScreenCtrl]
})
.directive('gameArea', function(){
	return {
		restrict: 'E',
		templateUrl: gameAreaTemplate
	};
});