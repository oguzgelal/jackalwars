ServiceConfiguration.configurations.remove({
	service: 'facebook'
});

ServiceConfiguration.configurations.insert({
	service: 'facebook',
	appId: process.env.FB_ID,
	secret: process.env.FB_SECRET
});