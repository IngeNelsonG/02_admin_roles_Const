document.addEventListener('DOMContentLoaded', () => {
    const studentAttendanceTable = document.getElementById('studentAttendanceTable').getElementsByTagName('tbody')[0];
    
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

    // Filtrar los registros para mostrar solo los del estudiante que ha iniciado sesión
    let studentRecords = attendanceRecords.filter(record => record.username === loggedInUser.username);

    studentRecords.forEach(record => {
        let row = studentAttendanceTable.insertRow();

        let cellDate = row.insertCell(0);
        cellDate.textContent = record.date;

        let cellAttendance = row.insertCell(1);
        cellAttendance.textContent = record.attendance;
    });
});
