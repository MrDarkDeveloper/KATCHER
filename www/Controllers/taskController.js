function addTaskToGroup(taskData, id_group, id_user) {
    $.ajax({
        url: addTask,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(taskData),
        success: function (response) {
            var agendaData = {
                id_user: id_user,
                id_group: id_group,
                id_task: response.id_task
            }

            createAgenda(agendaData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function deleteTasks(id_task) {
    $.ajax({
        url: removeTask + id_task,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {
            loadPartialView('modules/submodules/group_users', groupRender);
            successAlert('deleteUser');
            sfxPlay("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function changeCompleted(id_task, view){
    $.ajax({
        url: completedUpdate + "?id_task=" + id_task,
        method: 'PUT',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            successAlert("completed");
            sfxPlay("success");
            if(view == "tasks"){
                loadPartialView("modules/submodules/group_tasks", groupRender);
            }
            else if(view == "recent"){
                loadPartialView("modules/submodules/group_general", groupRender);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}