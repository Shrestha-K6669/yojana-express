const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charkilla_letter', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    admin_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    ref_no: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    date_appln: {
      type: DataTypes.DATE,
      allowNull: true
    },
    to_office_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    to_office_address: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    letter_body: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    local_level_name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    ward: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    kitta: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    seat_num: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    east: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    west: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    north: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    south: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kaifiyat: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    appln_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    appln_address: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    appln_ctzn: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    appln_phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'charkilla_letter',
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
