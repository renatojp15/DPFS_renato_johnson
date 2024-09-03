module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      }
    }, 
    {
      tableName: 'Categorias',
      timestamps: false,
    });
  
    return Categoria;
  };