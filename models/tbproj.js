const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbproj', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    tb_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tolebikas',
        key: '_id'
      }
    },
    project_level: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    project_name: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    allocated_budget: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    beneficiary_contrib: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    project_address: {
      type: DataTypes.STRING(180),
      allowNull: true
    },
    aim: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    start_date: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    end_date: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    agreement_date: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbproj',
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
        name: "tb_id",
        using: "BTREE",
        fields: [
          { name: "tb_id" },
        ]
      },
    ]
  });
};
