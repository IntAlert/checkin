'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    ad_id: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    in : DataTypes.DATE,
    out: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Entry;
};