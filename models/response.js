const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('response', {
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
    official_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'officials',
        key: '_id'
      }
    },
    ltr_to: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    ltr_dt: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ltr_sub: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ltr_body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ltr_bodharth: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    ltr_bodharth2: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    ltr_bodharth3: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    response_docs: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'response',
    timestamps: true,
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
      {
        name: "official_id",
        using: "BTREE",
        fields: [
          { name: "official_id" },
        ]
      },
    ]
  });
};
