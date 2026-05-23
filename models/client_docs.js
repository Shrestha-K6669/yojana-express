const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_docs', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    doc: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    client_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'client_info',
        key: '_id'
      }
    }
  }, {
    sequelize,
    tableName: 'client_docs',
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
        name: "client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
    ]
  });
};
