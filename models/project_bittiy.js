const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_bittiy', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tbproj',
        key: '_id'
      }
    },
    peskiamt: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    runningbill: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lastkista: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }

  }, {
    sequelize,
    tableName: 'project_bittiy',
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
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
