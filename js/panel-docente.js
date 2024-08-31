document.addEventListener('DOMContentLoaded', () => {
    const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let students = users.filter(user => user.userType === 'estudiante');

    students.forEach(student => {
        let row = attendanceTable.insertRow();
        
        let cellName = row.insertCell(0);
        cellName.textContent = student.username; // Mostrar el nombre del estudiante
        
        let cellDate = row.insertCell(1);
        let dateInput = document.createElement('input');
        dateInput.type = 'date';
        cellDate.appendChild(dateInput);
        
        let cellAttendance = row.insertCell(2);
        let selectAttendance = document.createElement('select');
        selectAttendance.innerHTML = `
            <option value="Presente">Presente</option>
            <option value="Retardo">Retardo</option>
            <option value="Ausente">Ausente</option>
        `;
        cellAttendance.appendChild(selectAttendance);

        row.dataset.username = student.username; // Asocia el nombre del estudiante con la fila
    });

    saveAttendanceButton.addEventListener('click', () => {
        let attendanceRecords = [];

        for (let row of attendanceTable.rows) {
            let username = row.dataset.username;
            let date = row.cells[1].getElementsByTagName('input')[0].value;
            let attendance = row.cells[2].getElementsByTagName('select')[0].value;

            if (date) { // Asegurarse de que se ha seleccionado una fecha
                attendanceRecords.push({
                    username: username,
                    date: date,
                    attendance: attendance
                });
            }
        }

        let allRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
        allRecords.push(...attendanceRecords);
        localStorage.setItem('attendanceRecords', JSON.stringify(allRecords));

        alert('Asistencia guardada correctamente');
    });
});
