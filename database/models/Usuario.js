module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
      image: {
        type: DataTypes.STRING(255),
      }
    }, {
      tableName: 'Usuarios',
      timestamps: false,
    });
  
    return Usuario;
  };