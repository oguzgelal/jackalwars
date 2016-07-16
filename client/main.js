import angular from 'angular';
import angularMeteor from 'angular-meteor';
import '../imports/startup/accounts-config.js';

import gameScreen from '../imports/components/gameScreen/gameScreen';


angular.module('jackal-wars', [
	angularMeteor,
	'accounts.ui',
	gameScreen.name
	]);