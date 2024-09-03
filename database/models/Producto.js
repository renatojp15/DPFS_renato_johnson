module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categorias', // Nombre de la tabla a la que hace referencia
                key: 'id',
            },
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        colors: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }},
        {
            tableName: 'Productos',
            timestamps: false,
        });
    return Producto;
}