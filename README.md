# Sign-in book for Alert
An app to allow staff to check in via a tablet at the entrances of the building.

The app also has an admin section that allows an admistrator (in a group that matches O365_ADMIN_GROUP_ID) to report and export unexplained absences.

## Development

Requirements
- *nodemon* `npm install -g nodemon`
- *Azure CLI* `npm install -g azure-cli`


1. `npm install`
2. `bower install`
3. Create a local MySQL database. Record connection details.
4. Create `.env` file in this directory. Add key-value pairs to match required server/API configs.
	```
	RDS_HOSTNAME=*
	RDS_USERNAME=*
	RDS_PASSWORD=*
	RDS_DB_NAME=*
	API_KEY=*

	COOKIE_KEY_1=*
	COOKIE_KEY_2=*
	COOKIE_KEY_3=*

	O365_TENANT_ID=*
	O365_CLIENT_ID=*
	O365_CLIENT_SECRET=*
	O365_TOKEN_ENDPOINT=*
	O365_GROUP_ID=*
	O365_ADMIN_GROUP_ID="*"
	```
5. `npm run dev`
6. Visit `http://127.0.0.1:3000/`


## Deployment
cf. https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-nodejs-get-started
1. Create MySQL server. Record connection details
2. Add all environment variables to "Application Settings" in Azure Portal (see .env above)
3. Log in to az using the CLI: `az login`
4. `git remote add azure https://asmt3@alertcheckin.scm.azurewebsites.net/alertcheckin.git`
5. `git push azure`
