let registerControllers = {

    create: (req, res) => {
        res.render('register');
    },

    send: async (req, res) => {
        let db = require('../database/models');
        const bcrypt = require('bcryptjs');
  
          try {
            const { firstName, lastName, email, password, category } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
        
            await db.Usuario.create({
              firstName,
              lastName,
              email,
              password: hashedPassword,
              category,
              image: req.file.filename
            });
        
            res.redirect('/');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el usuario');
          }
        },

        detail:  async (req, res) => {
            let db = require('../database/models');
    
            try {
              const { id } = req.params;
              const user = await db.Usuario.findByPk(id);
          
              if (!user) {
                return res.status(404).send('Usuario no encontrado');
              }
          
              res.render('userDetail', { user });
            } catch (error) {
              console.error(error);
              res.status(500).send('Error al ver el detalle del usuario');
            }
          },

          edit: async (req, res) => {
            let db = require('../database/models');
            try {
                const userId = req.params.id;
                const user = await db.Usuario.findByPk(userId);
        
                if (!user) {
                    return res.status(404).send('Usuario no encontrado');
                }
        
                res.render('userEdit', { user });
            } catch (error) {
                console.error('Error al cargar el formulario de edición de usuario:', error);
                res.status(500).send('Hubo un problema al cargar el formulario de edición');
            }
        },

        modifying: async (req, res) => {

        let db = require('../database/models');
        try {
        const { id } = req.params;
        const { firstName, lastName, email, category } = req.body;

        const user = await db.Usuario.findByPk(id);

        if (!user) {
        return res.status(404).send('Usuario no encontrado');
        }

        const updatedUser = {
        firstName,
        lastName,
        email,
        category
        };

        if (req.file) {
        updatedUser.image = req.file.filename;
        }

        await user.update(updatedUser);
        res.redirect(`/register/${id}`);
        } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
    },
}

module.exports = registerControllers;