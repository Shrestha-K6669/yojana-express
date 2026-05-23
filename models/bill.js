const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    bills_ref: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'bills',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    spec: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    amt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "bills_ref",
        using: "BTREE",
        fields: [
          { name: "bills_ref" },
        ]
      },
    ]
  });
};
