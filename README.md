# Sign-in book for Alert




## Local development

Requirements
- *nodemon* `npm install -g nodemon`

1. `cd app`
2. `npm install`
3. `bower install`
4. Create app/config/office365.js
	```
		// Application credentials from the Azure Management Portal.
	module.exports = {
	  tenantId: '*',
	  clientId: '*',
	  clientSecret: '*',
	  tokenEndpoint: '*',
	  groupId: '*'
	};
	```
5. Create app/config/session.js
	```
	module.exports = {
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true
	}
	```
6. `nodemon`
7. Visit `http://127.0.0.1:3000/`
