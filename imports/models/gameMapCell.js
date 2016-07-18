import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

class GameMapCell {

	constructor(i, j){
		this.i = i;
		this.j = j;
		this.col = this.getColLetter();
		this.row = ""+(this.i+1);
		this.id = this.col + this.row;
	}

	getColLetter(){
		let colLetter = "";
		let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		let letterRepeat = Math.floor(this.j/letters.length) + 1;
		let letterIndex = this.j % letters.length;
		for (let i = 0; i < letterRepeat; i++){
			colLetter+=letters[letterIndex];
		}
		return colLetter;
	};

	animateCell(type){
		angular.element('#'+this.id).addClass(type);
		angular.element('#'+this.id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			angular.element(this).removeClass(type);
		});
	};
}

export default GameMapCell;