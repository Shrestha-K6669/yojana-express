const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ward: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
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
    ]
  });
};
