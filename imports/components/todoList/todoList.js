import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks/tasks.js';
import template from './todoList.html';
import { Meteor } from 'meteor/meteor';

class TodoListCtrl {
	constructor($scope){
		$scope.viewModel(this);
		this.subscribe('tasks');
		this.hideCompleted = false;
		this.helpers({
			tasks(){
				const selector = {};
				if (this.getReactively('hideCompleted')) { selector.checked = {$ne: true}; }
				return Tasks.find(selector, {
					sort: { createdAt: -1 }
				});
			},
			incompleteCount(){
				return Tasks.find({
					checked: { $ne: true }
				}).count();
			},
			currentUser(){
				return Meteor.user();
			}
		});
	}
	addTask(){
		Meteor.call('tasks.insert', this.newTask);
		this.newTask = '';
	}
	setChecked(task){
		Meteor.call('tasks.setChecked', task._id, !task.checked);
	}
	removeTask(task){
		Meteor.call('tasks.remove', task._id);
	}
	setPrivate(task) {
		Meteor.call('tasks.setPrivate', task._id, !task.private);
	}
}

export default angular.module('todoList', [angularMeteor])
.component('todoList', {
	templateUrl: 'imports/components/todoList/todoList.html',
	controller: ['$scope', TodoListCtrl]
});