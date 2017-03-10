# Sign-in book for Alert


## Local development

0. `cd app`
1. `npm install`
2. `bower install`
3. Create app/lib/config.js
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
5. Visit `http://127.0.0.1:3000/`
