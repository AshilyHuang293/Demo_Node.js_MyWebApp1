const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TrafficMeg', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ChtMessage: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    EngMessage: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    StartTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    EndTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UpdateTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    JsonUpdateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TrafficMeg',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TrafficMeg",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
