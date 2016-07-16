import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Tasks } from './tasks.js';

console.log("Test-only code executed...");

if (Meteor.isServer){
	
	Meteor.methods({
		'test.resetDatabase': () => resetDatabase(),
	});

	describe('Tasks', function(done){
		describe('methods', function(done){

			const userId = Random.id();
			let taskId;

			beforeEach(function(){
				Meteor.call('test.resetDatabase', done);
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					owner: userId,
					username: 'tmeasday',
				});
			});

			it('cannot perform action without login', () => {
				Meteor.user = ()=>{ return null; };
				Meteor.userId = ()=>{ return null; };
				expect(() => {
					Meteor.call('tasks.insert', 'test');
				}).to.throw(/not-authorized/);
				expect(() => {
					Meteor.call('tasks.remove', taskId);
				}).to.throw(/not-authorized/);
				expect(() => {
					Meteor.call('tasks.setChecked', taskId, true);
				}).to.throw(/not-authorized/);
				expect(() => {
					Meteor.call('tasks.setPrivate', taskId, true);
				}).to.throw(/not-authorized/);
			});

			it('cannot delete non-owned task', () => {
				Meteor.user = ()=>{ return { _id: '0000000' }; };
				Meteor.userId = ()=>{ return '0000000'; };
				expect(() => {
					Meteor.call('tasks.remove', taskId);
				}).to.throw(/not-authorized/);
				assert.equal(Tasks.find().count(), 1);
			});

			it('can delete owned task', () => {
				Meteor.user = ()=>{ return { _id: userId }; };
				Meteor.userId = ()=>{ return userId; };
				Meteor.call('tasks.remove', taskId);
				assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}