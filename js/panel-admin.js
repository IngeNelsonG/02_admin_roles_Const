document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    // Obtiene el elemento <tbody> dentro de la tabla con el id 'usersTable'

    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Carga la lista de usuarios desde el localStorage o inicializa un arreglo vacío si no hay datos

    users.forEach((user) => {
        const row = usersTable.insertRow();
        // Inserta una nueva fila en la tabla

        row.insertCell(0).textContent = user.username;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.telefono;
        row.insertCell(3).textContent = user.userType;
        // Inserta celdas en la fila con los datos del usuario
    });
});