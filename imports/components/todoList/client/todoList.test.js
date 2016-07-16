/* eslint-env mocha */

import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import todoList from '../todoList';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { resetDatabase } from 'meteor/xolvio:cleaner';

console.log("Test-only code executed...");

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

describe('todoList', function(done) {

  var element;
  
  beforeEach(function(done){
    Meteor.call('test.resetDatabase', done);
    var $compile;
    var $rootScope;
    window.module(todoList.name);

    inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    element = $compile('<todo-list></todo-list>')($rootScope.$new(true));
    $rootScope.$digest();
  });

  describe('component', function() {
    it('should be showing incomplete tasks count right', function() {
      assert.include(element[0].querySelector('h1').innerHTML, '0');
    });
  });

  describe('controller', function() {
    describe('addTask', function() {
      var controller;
      var newTask = 'Be fabolous';

      beforeEach(() => {
        sinon.stub(Meteor, 'call');
        controller = element.controller('todoList');
        controller.newTask = newTask;
        controller.addTask(newTask);
      });

      afterEach(() => {
        Meteor.call.restore();
      });

      it('should call tasks.insert method', function() {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.insert', newTask);
      });

      it('should reset newTask', function() {
        assert.equal(controller.newTask, '');
      });
    });
  });
})