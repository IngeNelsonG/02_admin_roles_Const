document.addEventListener('DOMContentLoaded', () => {
    // Se ejecuta cuando el DOM ha sido completamente cargado y analizado

    const loginForm = document.getElementById('loginForm');
    // Obtiene el formulario de inicio de sesión con el id 'loginForm'

    const loginUsername = document.getElementById('loginUsername');
    // Obtiene el campo de entrada para el nombre de usuario con el id 'loginUsername'

    const loginPassword = document.getElementById('loginPassword');
    // Obtiene el campo de entrada para la contraseña con el id 'loginPassword'

    const loginFeedback = document.getElementById('loginFeedback');
    // Obtiene el elemento donde se mostrará el mensaje de retroalimentación con el id 'loginFeedback'

    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Carga la lista de usuarios desde el localStorage o inicializa un arreglo vacío si no hay datos

    loginForm.addEventListener('submit', (event) => {
        // Agrega un listener para el evento de envío del formulario

        event.preventDefault();
        // Previene el envío del formulario para manejarlo manualmente

        const username = loginUsername.value.trim();
        // Obtiene y limpia el valor del campo de nombre de usuario

        const password = loginPassword.value.trim();
        // Obtiene y limpia el valor del campo de contraseña

        loginFeedback.textContent = '';
        // Limpia cualquier mensaje de retroalimentación anterior

        if (username === '' || password === '') {
            // Verifica si alguno de los campos está vacío

            alert('Todos los campos son obligatorios.');
            // Muestra una alerta indicando que todos los campos son necesarios

            return;
            // Sale de la función para evitar que el código continúe
        }

        const user = users.find(u => u.username === username && u.password === password);
        // Busca un usuario en la lista de usuarios que coincida con el nombre de usuario y la contraseña proporcionados

        if (user) {
            // Si se encuentra un usuario que coincide

            localStorage.setItem('loggedInUser', JSON.stringify(user));
            // Guarda la información del usuario en el localStorage para mantener la sesión

            if (user.userType === 'admin') {
                // Si el tipo de usuario es 'admin'

                window.location.href = 'admin-panel.html';
                // Redirige al panel de administración
            } else if (user.userType === 'docente') {
                // Si el tipo de usuario es 'docente'

                window.location.href = 'docente-panel.html';
                // Redirige al panel del docente
            } else if (user.userType === 'estudiante') {
                // Si el tipo de usuario es 'estudiante'

                window.location.href = 'estudiante-panel.html';
                // Redirige al panel del estudiante
            }
        } else {
            // Si no se encuentra un usuario que coincida

            loginFeedback.textContent = 'Credenciales incorrectas.';
            // Muestra un mensaje de retroalimentación indicando que las credenciales son incorrectas

            alert('Credenciales incorrectas.');
            // Muestra una alerta indicando que las credenciales son incorrectas
        }
    });
});
