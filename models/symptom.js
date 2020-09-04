module.exports = function(sequelize, DataTypes) {
  const Symptom = sequelize.define("Symptom", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  });
  return Symptom;
};
