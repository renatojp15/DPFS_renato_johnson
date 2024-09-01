module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // El usuario está autenticado, puede continuar
    }
    res.redirect('/login'); // Si no está autenticado, redirige al login
};