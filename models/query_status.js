const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('query_status', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    query_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'client_query',
        key: '_id'
      }
    },
    completed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    pending: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'query_status',
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
        name: "query_id",
        using: "BTREE",
        fields: [
          { name: "query_id" },
        ]
      },
    ]
  });
};
