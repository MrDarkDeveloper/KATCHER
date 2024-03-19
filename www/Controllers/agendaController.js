function createAgenda(agendaData){
    $.ajax({
        url: addAgenda,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(agendaData),
        success: function (response) {
            successAlert("task");
            sfxPlay('success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function getAgendas(id_group){
    $.ajax({
        url: getAllAgendas + "?id_group=" + id_group,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            var agendasList = document.querySelector('.all-tasks-list');
            agendasList.innerHTML = "";
            response.forEach(agenda => {
                var eachAgenda = taskDesignModule.cloneNode(true);
                eachAgenda.querySelector('.agenda-name').innerText = agenda.taskname;
                eachAgenda.querySelector('.agenda-description').innerText = agenda.taskDescription;
                eachAgenda.querySelector('.agenda-user').innerText = agenda.taskUser;
                eachAgenda.querySelector('.agenda-start-date').innerText = agenda.taskStart;
                eachAgenda.querySelector('.agenda-end-date').innerText = agenda.taskEnd;
                agendasList.append(eachAgenda);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}