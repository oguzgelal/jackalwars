import angular from 'angular';
import angularMeteor from 'angular-meteor';
import GameMap from './gameMap.js';
import { Meteor } from 'meteor/meteor';

class Game {
	constructor(){
		this.map = new GameMap(6,6);
		this.init();
	}

	init(){
		this.map.resetMap();
	}
}

export default Game;