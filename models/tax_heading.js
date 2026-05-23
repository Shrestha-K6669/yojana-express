const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tax_heading', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tax_heading',
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
