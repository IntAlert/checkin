Sign-in book for Alert
===

Setup

1. `npm install`
2. `bower install`
3. Create app/lib/config.json
	```
		// Application credentials from the Azure Management Portal.
		module.exports = {
		  clientId: '***',
		  clientSecret: '***',
		  tokenEndpoint: '***',
		  groupId: '***'
		};

	```
4. `nodemon`