const db = require('../database/models');

const apiUsersControllers = {

    list: async (req, res) => {
        try {
            // Obtiene todos los usuarios de la base de datos
            const users = await db.Usuario.findAll({
                attributes: ['id', 'firstName', 'email']
            });

            // Crea un array con la estructura solicitada
            const usersData = users.map(user => {
                return {
                    id: user.id,
                    name: user.firstName,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                };
            });

            // Devuelve el objeto en formato JSON
            res.json({
                count: users.length,
                users: usersData
            });
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener la lista de usuarios' });
        }
    },

    detail: async (req, res) => {

        try {
            const userId = req.params.id;

            // Encuentra al usuario por su ID
            const user = await db.Usuario.findByPk(userId, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'image']
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Crea un objeto con la información del usuario
            const userDetail = {
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                imageUrl: `/images/users/${user.image}`
            };

            // Devuelve el objeto en formato JSON
            res.json(userDetail);
        } catch (error) {
            console.error('Error al obtener el detalle del usuario:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener el detalle del usuario' });
        }
    }

};

module.exports = apiUsersControllers;