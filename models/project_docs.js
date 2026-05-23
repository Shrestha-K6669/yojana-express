const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_docs', {
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
    documentname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_docs',
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
