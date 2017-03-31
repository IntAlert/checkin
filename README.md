# Sign-in book for Alert


## Deployment
cf. https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-nodejs-get-started
- Create MySQL server. Record connection details
- Follow these [instructions from Microsoft](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-nodejs-get-started)
- ```git push azure master```
- Add all environment variables to "Application Settings" in Azure Portal (see .env below)

## Local development

Requirements
- *nodemon* `npm install -g nodemon`


2. `npm install`
3. `bower install`
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
	```
6. `npm run dev`
7. Visit `http://127.0.0.1:3000/`


###Todo
- deploy to Azure

MySQL cost £3.72/month
