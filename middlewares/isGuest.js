module.exports = function isGuest(req, res, next) {
    if (!req.session.user) {
        return next(); // El usuario no está autenticado, puede continuar
    }
    res.redirect('/profile'); // Si está autenticado, redirige al perfil
};