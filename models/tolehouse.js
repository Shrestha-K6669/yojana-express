const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tolehouse', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    tbs_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tolebikas',
        key: '_id'
      }
    },
    house_num: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    owner_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(180),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tolehouse',
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
        name: "tbs_id",
        using: "BTREE",
        fields: [
          { name: "tbs_id" },
        ]
      },
    ]
  });
};
