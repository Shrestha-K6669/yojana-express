const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('email', {
    _id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    from_to: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'email',
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
