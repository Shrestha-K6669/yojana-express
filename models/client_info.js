const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_info', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    name_nep: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    name_eng: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    dob_nep: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dob_eng: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    contact_num: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ctz_num: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    house_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    local_level: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ward_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tole_name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    client_sewa_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'client_info',
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
