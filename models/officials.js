const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('officials', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    office_name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    office_code: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'server_office',
        key: '_id'
      }
    },
    designation: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    sign: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    seal: {
      type: DataTypes.STRING(180),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'officials',
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
        name: "office_code",
        using: "BTREE",
        fields: [
          { name: "office_code" },
        ]
      },
    ]
  });
};
