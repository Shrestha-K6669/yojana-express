const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tolebikasmember', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    tolebikas_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tolebikas',
        key: '_id'
      }
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    ctz: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    ctz_front: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    ctz_back: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
     seq: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tolebikasmember',
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
        name: "tolebikas_id",
        using: "BTREE",
        fields: [
          { name: "tolebikas_id" },
        ]
      },
    ]
  });
};
