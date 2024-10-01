document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function(event) {
        let valid = true;
        let errors = [];

        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const image = document.getElementById('image').value;

        // Validar nombre
        if (name.length < 5) {
            valid = false;
            errors.push('El nombre debe tener al menos 5 caracteres.');
        }

        // Validar descripción
        if (description.length < 10) {
            valid = false;
            errors.push('La descripción debe tener al menos 10 caracteres.');
        }

        // Validar imagen
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (image) {
            const fileExtension = image.split('.').pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                valid = false;
                errors.push('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).');
            }
        }

        if (!valid) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });
});