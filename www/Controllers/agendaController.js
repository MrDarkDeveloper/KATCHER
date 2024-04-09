function createAgenda(agendaData) {
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

function getAgendas(id_group, isMyTask) {
    $.ajax({
        url: getAllAgendas + "?id_group=" + id_group,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            setAgendasInfo(response, isMyTask)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setAgendasInfo(agendas, isMyTask) {
    if (isMyTask == false) {
        let agendasList = document.querySelector('.all-tasks-list');
        agendasList.innerHTML = "";
        agendas.forEach(agenda => {
            var eachAgenda = taskDesignModule.cloneNode(true);
            eachAgenda.querySelector('.agenda-name').innerText = agenda.taskname;
            eachAgenda.querySelector('.agenda-description').innerText = agenda.taskDescription;
            eachAgenda.querySelector('.agenda-user').innerText = agenda.taskUser;
            eachAgenda.querySelector('.agenda-start-date').innerText = agenda.taskStart;
            eachAgenda.querySelector('.agenda-end-date').innerText = agenda.taskEnd;
            agendasList.append(eachAgenda);
        });
    }
    else if (isMyTask == true) {
        let agendasList = document.querySelector('.my-tasks-list');
        agendasList.innerHTML = "";
        agendas.forEach(agenda => {
            if (agenda.taskUserId == getLocalStorageValue("id_user")) {
                var eachAgenda = taskDesignModule.cloneNode(true);
                eachAgenda.querySelector('.agenda-name').innerText = agenda.taskname;
                eachAgenda.querySelector('.agenda-description').innerText = agenda.taskDescription;
                eachAgenda.querySelector('.agenda-user').innerText = agenda.taskUser;
                eachAgenda.querySelector('.agenda-start-date').innerText = agenda.taskStart;
                eachAgenda.querySelector('.agenda-end-date').innerText = agenda.taskEnd;
                agendasList.append(eachAgenda);
            }
        });
    }
}

function deleteAgenda(id_user, id_group) {
    $.ajax({
        url: removeAgenda + "?id_user=" + id_user + "&id_group=" + id_group,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {
            response.forEach(agenda => {
                deleteTasks(agenda.id_task);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function recentAgendas(id_user, id_group, recentVal){
    $.ajax({
        url: getAllAgendas + "?id_group=" + id_group + "&recent=" + recentVal,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            var recentList = document.querySelector('.recent-tasks');
            recentList.innerHTML = "";
            response.forEach(recent => {
                var eachRecent = taskDesignModule.cloneNode(true);
                eachRecent.querySelector('.agenda-name').innerText = recent.taskname;
                eachRecent.querySelector('.agenda-description').innerText = recent.taskDescription;
                eachRecent.querySelector('.agenda-user').innerText = recent.taskUser;
                eachRecent.querySelector('.agenda-start-date').innerText = recent.taskStart;
                eachRecent.querySelector('.agenda-end-date').innerText = recent.taskEnd;
                recentList.append(eachRecent);
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}