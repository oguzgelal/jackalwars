import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import GameMapCell from './gameMapCell.js'

class GameMap {
	constructor(row, col){
		this.mapRowCnt = row;
		this.mapColCnt = col;
		this.selectedCell = "";
		this.data = [];
	}

	calculateTableSize(which){
		let cellCount = this.mapRowCnt * this.mapColCnt;
		let cellCountAverage = Math.round(Math.sqrt(this.mapRowCnt * this.mapColCnt));
		let cellSize = (cellCountAverage * 13);
		this.mapTableWidth = (cellSize*this.mapColCnt)+"px";
		this.mapTableHeight = (cellSize*this.mapRowCnt)+"px";
	};

	resetMap(){
		for (let i = 0; i < this.mapRowCnt; i++){
			this.data[i] = [];
			for (let j = 0; j < this.mapColCnt; j++){
				this.data[i][j] = new GameMapCell(i, j);
			}
		}
		this.calculateTableSize();
	};

	selectCell(cell){
		if (this.selectedCell == cell.id){
			cell.animateCell('rubberBand');
			this.selectedCell = "";
		}
		else{
			cell.animateCell('rubberBand');
			this.selectedCell = cell.id;
		}
	};

	
}

export default GameMap;