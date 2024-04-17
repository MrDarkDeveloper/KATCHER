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
            eachAgenda.querySelector('.agenda-start-date').innerText = "Start: " + agenda.taskStart;
            eachAgenda.querySelector('.agenda-end-date').innerText = "End: " + agenda.taskEnd;
            if (agenda.taskCompleted == false) {
                eachAgenda.querySelector('.button-completed').style.display = agenda.taskUserId == getLocalStorageValue("id_user") ? "Block" : "None";
            }
            else {
                eachAgenda.querySelector('.button-completed').style.display = "None";
            }
            eachAgenda.querySelector('.text-completed').style.display = agenda.taskCompleted == true ? "Inline" : "None";
            if (agenda.taskCompleted == false) {
                eachAgenda.querySelector('.button-completed').addEventListener('click', function () {
                    changeCompleted(agenda.taskId, "tasks");
                });
            }
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
                eachAgenda.querySelector('.agenda-start-date').innerText = "Start: " + agenda.taskStart;
                eachAgenda.querySelector('.agenda-end-date').innerText = "End: " + agenda.taskEnd;
                if (agenda.taskCompleted == false) {
                    eachAgenda.querySelector('.button-completed').style.display = agenda.taskUserId == getLocalStorageValue("id_user") ? "Block" : "None";
                }
                else {
                    eachAgenda.querySelector('.button-completed').style.display = "None";
                }
                eachAgenda.querySelector('.text-completed').style.display = agenda.taskCompleted == true ? "Inline" : "None";
                if (agenda.taskCompleted == false) {
                    eachAgenda.querySelector('.button-completed').addEventListener('click', function () {
                        changeCompleted(agenda.taskId, "tasks");
                    });
                }
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

function recentAgendas(id_user, id_group, recentVal) {
    $.ajax({
        url: getAllAgendas + "?id_group=" + id_group + "&recent=" + recentVal,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            var recentList = document.querySelector('.recent-tasks');
            recentList.innerHTML = "";
            response.forEach(recent => {
                let eachAgenda = taskDesignModule.cloneNode(true);
                eachAgenda.querySelector('.agenda-name').innerText = recent.taskname;
                eachAgenda.querySelector('.agenda-description').innerText = recent.taskDescription;
                eachAgenda.querySelector('.agenda-user').innerText = recent.taskUser;
                eachAgenda.querySelector('.agenda-start-date').innerText = "Start: " + recent.taskStart;
                eachAgenda.querySelector('.agenda-end-date').innerText = "End: " + recent.taskEnd;
                if (recent.taskCompleted == false) {
                    eachAgenda.querySelector('.button-completed').style.display = recent.taskUserId == getLocalStorageValue("id_user") ? "Block" : "None";
                }
                else {
                    eachAgenda.querySelector('.button-completed').style.display = "None";
                }
                eachAgenda.querySelector('.text-completed').style.display = recent.taskCompleted == true ? "Inline" : "None";
                if (recent.taskCompleted == false) {
                    eachAgenda.querySelector('.button-completed').addEventListener('click', function () {
                        changeCompleted(recent.taskId, "recent");
                    });
                }
                recentList.append(eachAgenda);
                
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}