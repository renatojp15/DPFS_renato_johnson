module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      colorName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      }
    }, {
      tableName: 'Colores',
      timestamps: false,
    });
  
    return Color;
  };