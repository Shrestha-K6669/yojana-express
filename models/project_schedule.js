const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_schedule', {
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
    activities: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    start_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    end_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    misc: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_schedule',
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
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
