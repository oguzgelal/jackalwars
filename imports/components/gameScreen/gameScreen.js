import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './gameScreen.html';
import gameAreaTemplate from './gameArea/gameArea.html';
import { Meteor } from 'meteor/meteor';

class GameScreenCtrl {
	constructor($scope, $timeout){
		$scope.viewModel(this);
		this.helpers({
		});

		$scope.getColLetter = function(colNum){
			var colLetter = "";
			var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			var letterRepeat = Math.floor((colNum-1)/letters.length) + 1;
			var letterIndex = (colNum-1) % letters.length;
			for (var i = 0; i < letterRepeat; i++){
				colLetter+=letters[letterIndex];
			}
			return colLetter;
		};

		$scope.calculateTableSize = function(which){
			var cellCount = $scope.mapRowCnt * $scope.mapColCnt;
			var cellCountAverage = Math.round(Math.sqrt($scope.mapRowCnt * $scope.mapColCnt));
			var cellSize = (cellCountAverage * 13);
			$scope.mapTableWidth = (cellSize*$scope.mapColCnt)+"px";
			$scope.mapTableHeight = (cellSize*$scope.mapRowCnt)+"px";
		};
		
		$scope.mapData = [];
		$scope.mapRowCnt = 6;
		$scope.mapColCnt = 6;
		$scope.selectedCell = "";
		
		angular.element(window).resize(function(){
			$timeout(function(){
				$scope.calculateTableSize();
			});
		});

		$scope.resetMap = function(){
			for (var i = 0; i < $scope.mapRowCnt; i++){
				$scope.mapData[i] = [];
				for (var j = 0; j < $scope.mapColCnt; j++){
					var col = $scope.getColLetter(j+1);
					var row = ""+(i+1);
					var id = col+row;
					if (!$scope.mapData[i][j]){
						$scope.mapData[i][j] = {id:id,col:col,row:row,i:i,j:j};
					}
				}
			}
			$scope.calculateTableSize();
		};

		$scope.selectCell = function(cell){
			if ($scope.selectedCell == cell.id){ $scope.selectedCell = ""; }
			else{
				$scope.animateCell(cell, 'rubberBand');
				$scope.selectedCell = cell.id;
			}
		};

		$scope.animateCell = function(cell, type){
			angular.element('#'+cell.id).addClass(type);
			angular.element('#'+cell.id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				angular.element(this).removeClass(type);
			});
		};

		$scope.resetMap();
		$scope.$watch('mapRowCnt', function(){ $scope.resetMap(); });
		$scope.$watch('mapColCnt', function(){ $scope.resetMap(); });
	}
}

export default angular.module('gameScreen', [angularMeteor])
.component('gameScreen', {
	templateUrl: template,
	controller: ['$scope', '$timeout', GameScreenCtrl]
})
.directive('gameArea', function(){
	return {
		restrict: 'E',
		templateUrl: gameAreaTemplate
	};
});