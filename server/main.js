import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.onConnection((node) => {
	console.log("client connected.");
	console.log(node.id);
})