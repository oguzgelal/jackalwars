// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
// Templates
import template from './loginScreen.html';

class LoginScreenCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		this.helpers({
		});
	}
}

export default angular.module('loginScreen', [angularMeteor])
.component('loginScreen', {
	templateUrl: template,
	controller: ['$scope', LoginScreenCtrl]
});