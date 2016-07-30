// Base Imports
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
// Templates
import template from './homeScreen.html';

class HomeScreenCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		this.helpers({
			user(){ return Meteor.user(); } 
		});
	}

	logout(){
		Meteor.logout(function(){
			console.log("logged out...");
		});
	}
}

export default angular.module('homeScreen', [angularMeteor, uiRouter])
.component('homeScreen', {
	templateUrl: template,
	controller: ['$scope', HomeScreenCtrl]
})
.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/',
		template: '<home-screen></home-screen>'
	});
});