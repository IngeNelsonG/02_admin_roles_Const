document.addEventListener('DOMContentLoaded', () => {
    // Espera a que el contenido del DOM se haya cargado completamente antes de ejecutar el código dentro de la función

    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    // Obtiene el elemento <tbody> dentro de la tabla con el id 'usersTable'

    const userForm = document.getElementById('userForm');
    // Obtiene el formulario con el id 'userForm'

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const documentoInput = document.getElementById('documento');
    const telefonoInput = document.getElementById('telefono');
    const userTypeSelect = document.getElementById('userType');
    const editIndexInput = document.getElementById('editIndex');
    const feedback = document.getElementById('feedback');
    // Obtiene los campos de entrada y el campo oculto para el índice de edición

    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Carga la lista de usuarios desde el localStorage o inicializa un arreglo vacío si no hay datos

    const updateTable = () => {
        usersTable.innerHTML = '';
        // Limpia el contenido actual de la tabla

        users.forEach((user, index) => {
            const row = usersTable.insertRow();
            // Inserta una nueva fila en la tabla

            row.insertCell(0).textContent = user.username;
            row.insertCell(1).textContent = user.password;
            row.insertCell(2).textContent = user.email;
            row.insertCell(3).textContent = user.documento;
            row.insertCell(4).textContent = user.telefono;
            row.insertCell(5).textContent = user.userType;
            // Inserta celdas en la fila con los datos del usuario

            const actionsCell = row.insertCell(6);
            actionsCell.innerHTML = `
                <button class="edit" onclick="editUser(${index})">Editar</button>
                <button class="delete" onclick="deleteUser(${index})">Eliminar</button>
            `;
            // Inserta botones de editar y eliminar en la última celda de la fila
        });
    };

    window.editUser = (index) => {
        const user = users[index];
        // Obtiene el usuario correspondiente al índice proporcionado

        usernameInput.value = user.username;
        passwordInput.value = user.password;
        emailInput.value = user.email;
        documentoInput.value = user.documento;
        telefonoInput.value = user.telefono;
        userTypeSelect.value = user.userType;
        editIndexInput.value = index;
        // Rellena los campos del formulario con los datos del usuario para editar
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        // Elimina el usuario en el índice especificado del arreglo

        localStorage.setItem('users', JSON.stringify(users));
        // Guarda la lista actualizada de usuarios en el localStorage

        updateTable();
        // Actualiza la tabla para reflejar los cambios
    };

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Evita que el formulario se envíe de la manera tradicional

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();
        const documento = documentoInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const userType = userTypeSelect.value;
        // Obtiene y limpia los valores de los campos del formulario

        if (username === '' || password === '' || email === '' || documento === '' || telefono === '' || userType === '') {
            alert('Todos los campos son obligatorios.');
            return;
            // Muestra una alerta si algún campo está vacío
        }

        if (editIndexInput.value === '') {
            // Añadir nuevo usuario
            if (users.some(u => u.username === username)) {
                alert(`El nombre de usuario "${username}" ya existe.`);
                return;
                // Muestra una alerta si el nombre de usuario ya existe
            }

            users.push({ username, password, email, documento, telefono, userType });
            // Añade un nuevo usuario al arreglo
        } else {
            // Actualizar usuario existente
            const index = parseInt(editIndexInput.value, 10);
            if (users.some((u, i) => u.username === username && i !== index)) {
                alert(`El nombre de usuario "${username}" ya existe.`);
                return;
                // Muestra una alerta si el nombre de usuario ya existe para otro usuario
            }

            users[index] = { username, password, email, documento, telefono, userType };
            // Actualiza el usuario en el índice especificado
        }

        localStorage.setItem('users', JSON.stringify(users));
        // Guarda la lista actualizada de usuarios en el localStorage

        userForm.reset();
        // Limpia el formulario

        editIndexInput.value = '';
        // Reinicia el campo oculto de índice de edición

        updateTable();
        // Actualiza la tabla para reflejar los cambios
    });

    updateTable();
    // Inicializa la tabla al cargar la página
});
