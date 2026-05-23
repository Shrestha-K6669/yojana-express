const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proj_beneficiary', {
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
    male: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    female: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    houses: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    janajati_m: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    janajati_f: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    dalit_m: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    dalit_f: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    other_m: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    other_f: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    house_j: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    house_d: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    house_o: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'proj_beneficiary',
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
    ]
  });
};
