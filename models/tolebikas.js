const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tolebikas', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    ward_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tole: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    boundary_east: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    boundary_west: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    boundary_north: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    boundary_south: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    office_address: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    co_ordinate: {
      type: DataTypes.JSON,
      allowNull: true
    },
    profilepic: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    account_num: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pan_num: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reg_num: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tolebikas',
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
    ]
  });
};
