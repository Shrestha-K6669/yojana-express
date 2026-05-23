const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('anugaman_samiti', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    tolebks_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tolebikas',
        key: '_id'
      }
    },
    name: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    ctz: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'anugaman_samiti',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "_id" },
        ]
      },
      {
        name: "tolebks_id",
        using: "BTREE",
        fields: [
          { name: "tolebks_id" },
        ]
      },
    ]
  });
};
