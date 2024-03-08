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
    })
}