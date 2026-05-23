const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kanuninfo', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    kanun_type: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'kanun_type',
        key: '_id'
      }
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    k_file_pdf: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    k_file_word: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kanuninfo',
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
        name: "kanun_type",
        using: "BTREE",
        fields: [
          { name: "kanun_type" },
        ]
      },
    ]
  });
};
