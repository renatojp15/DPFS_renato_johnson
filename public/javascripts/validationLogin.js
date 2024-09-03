document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        let valid = true;
        let errors = [];

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            errors.push('Debe ser un formato de email válido.');
        }

        // Validar contraseña
        if (password.length < 8) {
            valid = false;
            errors.push('La contraseña debe tener al menos 8 caracteres.');
        }

        if (!valid) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });
});