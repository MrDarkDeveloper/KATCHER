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