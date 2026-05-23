const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bills', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    ward_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    paid_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bills',
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
        name: "admin_id",
        using: "BTREE",
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
};
