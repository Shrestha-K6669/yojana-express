const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_query', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    querytype: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    office_type: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'server_office',
        key: '_id'
      }
    },
    date_nep: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    client_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'client_info',
        key: '_id'
      }
    },
    letter_to: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    to_addr: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    ltr_sub: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    ltr_body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ltr_bodharth: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    client_sgn: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ltr_file: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'client_query',
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
        name: "office_type",
        using: "BTREE",
        fields: [
          { name: "office_type" },
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
