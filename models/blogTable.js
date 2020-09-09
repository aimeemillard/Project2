/* eslint-disable no-var */
module.exports = function(sequelize, DataTypes) {
  var blogTB = sequelize.define("blogTB", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    blog: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    }
  });
  return blogTB;
};
