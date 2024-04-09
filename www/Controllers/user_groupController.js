function addUserGroup(userGroupData){
    $.ajax({
        url: userGroupsAdd,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(userGroupData),
        success: function(response){
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function addMultipleUsers(arrayUsers){
    arrayUsers.forEach(user_group => {
        $.ajax({
            url: userGroupsAdd,
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(user_group),
            success: function(response){
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Manejar cualquier error que ocurra durante la solicitud AJAX
                console.error('Error:', textStatus, errorThrown);
            }
        });
    });
    successAlert("addUsers");
    sfxPlay("success");
}

function existsUser(id_user, id_group, foundUserVar, selectedUlVar){
    $.ajax({
        url: existUser + "?id_user=" + id_user + "&id_group=" + id_group,
        method: "GET",
        contentType: "application/json",
        success: function(response){
            addSelectedUsers(response, foundUserVar, selectedUlVar);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function deleteUserFromGroup(id_user, id_group){
    $.ajax({
        url: deleteUser + "?id_user=" + id_user + "&id_group=" + id_group,
        method: "DELETE",
        contentType: "application/json",
        success: function(response){
            deleteAgenda(id_user, id_group);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}