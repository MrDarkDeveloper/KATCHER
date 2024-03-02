function login(formData) {
    $.ajax({
        url: loginUser,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response);

            saveLocalStorageValue("id_user", response.id_user);

            loadPartialView('modules/main', appRender);
            loadPartialView("modules/navbar", appNav);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function register(registerData){
    $.ajax({
        url: createUser,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(registerData),
        success: function(response){
            console.log(response.id);

            var idUser = response.id_user;

            saveLocalStorageValue("id_user", idUser);

            loadPartialView('modules/main', appRender);
            loadPartialView("modules/navbar", appNav);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function updateData(updatedData, id){
    $.ajax({
        url: updateUser + id,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        success: function(response){
            console.log('actualizado');
            loadPartialView('modules/settings', appRender);
            successAlert("update");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function logout(){
    removeLocalStorageValue("id_user");
    loadPartialView('init', appRender);
    document.querySelector(".myNavBar").remove();
}

function getUserData(id){
    $.ajax({
        url: getUser + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
            var user = response;
            setUserDataSettings(user);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setUserDataSettings(user){
    document.querySelector('.settings-username').innerHTML = user.username;
    document.querySelector('.inputName').value = user.username;
    document.querySelector('.inputPassword').value = user.password;
    user.profile_photo == "None" ? document.querySelector('.imagen_user').src = "/www/Public/img/default.png" : document.querySelector('.imagen_user').src = user.profile_photo;
    user.profile_photo == "None" ? document.querySelector('.delete_image').style.display = "none" : document.querySelector('.delete_image').style.display = "inline";
}

function changeProfilePhoto(file){

    firebase.initializeApp(firebaseConfig);
            
    var storage = firebase.storage();
    var storageRef = storage.ref();
            
    var uploadTask = storageRef.child('KATCHER_STORAGE/Users/' + "ID: " + getLocalStorageValue("id_user").toString()).put(file);

    uploadTask.on('state_changed', 
        function(snapshot){
                    
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        function(error) {
            
            console.error('Error uploading file: ', error);
        }, 
        function() {
            
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var photoData = {
                    profile_photo: downloadURL.toString()
                }
                uploadProfilePhoto(photoData, getLocalStorageValue("id_user"));
            });
        }
    );
}

function deletePhotoStorage(){
    firebase.initializeApp(firebaseConfig);
            
    var storage = firebase.storage();
    var storageRef = storage.ref();
            
    var uploadTask = storageRef.child('KATCHER_STORAGE/Users/' + "ID: " + getLocalStorageValue("id_user").toString());

    uploadTask.delete().then(function() {

        console.log('Archivo eliminado correctamente');
        var photoData = {
            profile_photo: "None"
        }
        uploadProfilePhoto(photoData, getLocalStorageValue("id_user"));

      }).catch(function(error) {

        console.error('Error al eliminar el archivo:', error);

      });

    
}

function uploadProfilePhoto(photoData, id){
    $.ajax({
        url: updateUser + id,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(photoData),
        success: function(response){
            console.log('actualizado');
            loadPartialView('modules/settings', appRender);
            successAlert("photo");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}