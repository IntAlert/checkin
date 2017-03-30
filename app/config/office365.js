const dotenv = require('dotenv').config();

module.exports = {
  tenantId: 'international-alert.org',
  clientId: 'e91b6ce4-702e-4d91-8fd0-a0a216854b24',
  clientSecret: 'LSb32gmzKpQkEVBEwnAYw/M5w2hrbGKXlHKpBxQbxjg=',
  tokenEndpoint: 'https://login.windows.net/international-alert.org/oauth2/token',
  groupId: '375abe38-5b56-4deb-b725-02ce52b2a339'
};

module.exports = {
  tenantId: process.env.O365_TENANT_ID,
  clientId: process.env.O365_CLIENT_ID,
  clientSecret: process.env.O365_CLIENT_SECRET,
  tokenEndpoint: process.env.O365_TOKEN_ENDPOINT,
  groupId: process.env.O365_GROUP_ID
};