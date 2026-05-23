const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('budget_project', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    proj_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tbproj',
        key: '_id'
      }
    },
    bk_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'budget_karykram',
        key: '_id'
      }
    },
    misc: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'budget_project',
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
        name: "proj_id",
        using: "BTREE",
        fields: [
          { name: "proj_id" },
        ]
      },
      {
        name: "bk_id",
        using: "BTREE",
        fields: [
          { name: "bk_id" },
        ]
      },
    ]
  });
};
