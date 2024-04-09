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