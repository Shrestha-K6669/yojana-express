const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('housemember', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    house_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tolehouse',
        key: '_id'
      }
    },
    name: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    ctz: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true
    },
    profileimg: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'housemember',
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
        name: "house_id",
        using: "BTREE",
        fields: [
          { name: "house_id" },
        ]
      },
    ]
  });
};
