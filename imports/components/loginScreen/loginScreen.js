// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
// Templates
import template from './loginScreen.html';

class LoginScreenCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		this.helpers({
			user(){ return Meteor.user(); } 
		});
	}

	loginWithFacebook(){
		Meteor.loginWithFacebook({}, function(){
			console.log("logged in");
		});
	}

	logout(){
		Meteor.logout(function(){
			console.log("logged out...");
		});
	}
}

export default angular.module('loginScreen', [angularMeteor, uiRouter])
.component('loginScreen', {
	templateUrl: template,
	controller: ['$scope', LoginScreenCtrl]
})
.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		template: '<login-screen></login-screen>'
	});
});