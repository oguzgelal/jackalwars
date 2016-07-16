import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	Meteor.publish('tasks', function tasksPublication() {
		return Tasks.find({
			$or: [{ private: { $ne: true }}, { owner: this.userId }],
		});
	});
}


Meteor.methods({
	'loginCheck' (){
		if (!Meteor.userId()){ throw new Meteor.Error('not-authorized'); }
	},
	'tasks.ownerCheck' (taskId){
		Meteor.call('loginCheck');
		check(taskId, String);
		const task = Tasks.findOne(taskId);
		if (task.owner !== Meteor.userId()){ throw new Meteor.Error('not-authorized'); }
	},
	'tasks.insert' (text) {
		Meteor.call('loginCheck');
		check(text, String);
		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			name: Meteor.user().profile.name,
		});
	},
	'tasks.remove' (taskId) {
		Meteor.call('tasks.ownerCheck', taskId);
		check(taskId, String);
		Tasks.remove(taskId);
	},
	'tasks.setChecked' (taskId, setChecked) {
		Meteor.call('tasks.ownerCheck', taskId);
		check(taskId, String);
		check(setChecked, Boolean);
		Tasks.update(taskId, {
			$set:{
				checked: setChecked
			}
		});
	},
	'tasks.setPrivate' (taskId, setToPrivate) {
		Meteor.call('tasks.ownerCheck', taskId);
		check(setToPrivate, Boolean);
		Tasks.update(taskId, {
			$set: {
				private: setToPrivate
			}
		});
	},
});