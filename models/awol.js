'use strict';
module.exports = function(sequelize, DataTypes) {
  var Awol = sequelize.define('Awol', {
    ad_id: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Awol;
};