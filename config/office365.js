const dotenv = require('dotenv').config();

module.exports = {
  tenantId: process.env.O365_TENANT_ID,
  clientId: process.env.O365_CLIENT_ID,
  clientSecret: process.env.O365_CLIENT_SECRET,
  tokenEndpoint: process.env.O365_TOKEN_ENDPOINT,
  groupId: process.env.O365_GROUP_ID
};