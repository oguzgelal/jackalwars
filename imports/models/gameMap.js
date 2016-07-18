import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import GameMapCell from './gameMapCell.js'

class GameMap {
	constructor(row, col){
		this.mapRowCnt = row;
		this.mapColCnt = col;
		this.activeCell = null;
		this.data = [];
	}

	calculateTableSize(){
		// TODO : support larger table sizes better
		let cellCount = this.mapRowCnt * this.mapColCnt;
		let cellCountAverage = Math.round(Math.sqrt(this.mapRowCnt * this.mapColCnt));
		let cellSize = (cellCountAverage * 13);
		this.mapTableWidth = (cellSize*this.mapColCnt);
		this.mapTableHeight = (cellSize*this.mapRowCnt);
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
		if (this.activeCell && this.activeCell.id == cell.id){
			this.activeCell.animateCell('rubberBand');
			this.activeCell = null;
		}
		else{
			this.activeCell = cell;
			this.activeCell.animateCell('rubberBand');
		}
	};

	
}

export default GameMap;