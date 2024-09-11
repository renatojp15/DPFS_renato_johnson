const db = require('../database/models');

let apiProductsControllers = {
    list: async (req, res) => {
        try {
            const products = await db.Producto.findAll({
                include: [{ model: db.Categoria, as: 'Categoria' }]
            });

            const countByCategory = {};
            products.forEach(product => {
                const categoryName = product.Categoria.name;
                if (!countByCategory[categoryName]) {
                    countByCategory[categoryName] = 0;
                }
                countByCategory[categoryName]++;
            });

            res.json({
                count: products.length,
                countByCategory,
                products: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    categories: product.Categoria.name,
                    detail: `/api/products/${product.id}`
                }))
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la lista de productos' });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id, {
                include: [db.Categoria, db.Color]
            });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                categories: product.Categoria ? [product.Categoria.name] : [],
                colors: product.Colors ? product.Colors.map(color => color.colorName) : [],
                imageUrl: `/images/products/${product.image}`
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el detalle del producto' });
        }
    }
};

module.exports = apiProductsControllers;