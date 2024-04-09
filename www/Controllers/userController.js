function login(formData) {
    $.ajax({
        url: "https://localhost:44358/api/users/login",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            console.table(response);

            saveLocalStorageValue("id_user", response.id_user);

            loadPartialView('modules/main', appRender);
            loadPartialView("modules/navbar", appNav);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function register(registerData) {
    $.ajax({
        url: createUser,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(registerData),
        success: function (response) {
            console.log(response.id);

            var idUser = response.id_user;

            saveLocalStorageValue("id_user", idUser);

            loadPartialView('modules/main', appRender);
            loadPartialView("modules/navbar", appNav);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function updateData(updatedData, id) {
    $.ajax({
        url: updateUser + id,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        success: function (response) {
            console.log('actualizado');
            loadPartialView('modules/settings', appRender);
            successAlert("update");
            sfxPlay("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function logout() {
    removeLocalStorageValue("id_user");
    loadPartialView('init', appRender);
    document.querySelector(".myNavBar").remove();
}

function getUserData(id) {
    $.ajax({
        url: getUser + id,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            var user = response;
            setUserDataSettings(user);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setUserDataSettings(user) {
    document.querySelector('.settings-username').innerHTML = user.username;
    document.querySelector('.inputName').value = user.username;
    document.querySelector('.inputPassword').value = user.password;
    user.profile_photo == "None" ? document.querySelector('.imagen_user').src = "/www/Public/img/default.png" : document.querySelector('.imagen_user').src = user.profile_photo;
    user.profile_photo == "None" ? document.querySelector('.delete_image').style.display = "none" : document.querySelector('.delete_image').style.display = "inline";
}

function changeProfilePhoto(file) {

    firebase.initializeApp(firebaseConfig);

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var uploadTask = storageRef.child('KATCHER_STORAGE/Users/' + "ID: " + getLocalStorageValue("id_user").toString()).put(file);

    uploadTask.on('state_changed',
        function (snapshot) {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        function (error) {

            console.error('Error uploading file: ', error);
        },
        function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                var photoData = {
                    profile_photo: downloadURL.toString()
                }
                uploadProfilePhoto(photoData, getLocalStorageValue("id_user"));
            });
        }
    );
}

function deletePhotoStorage() {
    firebase.initializeApp(firebaseConfig);

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var uploadTask = storageRef.child('KATCHER_STORAGE/Users/' + "ID: " + getLocalStorageValue("id_user").toString());

    uploadTask.delete().then(function () {

        console.log('Archivo eliminado correctamente');
        var photoData = {
            profile_photo: "None"
        }
        uploadProfilePhoto(photoData, getLocalStorageValue("id_user"));

    }).catch(function (error) {

        console.error('Error al eliminar el archivo:', error);

    });


}

function uploadProfilePhoto(photoData, id) {
    $.ajax({
        url: updateUser + id,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(photoData),
        success: function (response) {
            console.log('actualizado');
            loadPartialView('modules/settings', appRender);
            successAlert("photo");
            sfxPlay("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function searchUsers(username) {
    $.ajax({
        url: searchUser + "?username=" + username,
        method: "GET",
        contentType: 'application/json',
        success: function (response) {
            let ul = document.querySelector('.found-users');
            let selectedUl = document.querySelector('.selected-users');
            ul.innerHTML = ""
            if (response.length > 0) {
                response.forEach(foundUser => {
                    ulElement = foundUserModule.cloneNode(true);
                    ul.append(ulElement);

                    this_element = ul.lastChild;

                    this_element.querySelector(".found-image").src = foundUser.profile_photo == "None" ? "/www/Public/img/default.png" : foundUser.profile_photo;
                    this_element.querySelector(".found-name").innerText = foundUser.username;

                    this_element.addEventListener('click', function () {
                        existsUser(foundUser.id_user, actualGroup, foundUser, selectedUl);
                    });


                });
            }
            else {
                ul.innerHTML = "No user found";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function addSelectedUsers(response, foundUserVar, selectedUlVar) {
    if (response === false) {
        document.querySelector('.errorSelected').style.display = "none";
        var exists = false;
        for (var i = 0; i < arrayUsers.length; i++) {
            var user = arrayUsers[i];
            if (user.id_group === actualGroup && user.id_user === foundUserVar.id_user) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            let selectedElement = selectedUserModule.cloneNode(true);
            selectedElement.querySelector('.selected-image').src = foundUserVar.profile_photo == "None" ? "/www/Public/img/default.png" : foundUserVar.profile_photo;
            selectedElement.querySelector('.selected-name').innerText = foundUserVar.username;
            selectedElement.querySelector('.delete-selected-user').id = foundUserVar.id_user;
            selectedUlVar.append(selectedElement);

            var objectUser = {
                id_group: actualGroup,
                id_user: foundUserVar.id_user
            }

            arrayUsers.push(objectUser);

            selectedElement.querySelector('.delete-selected-user').addEventListener('click', function (e) {
                for (var i = 0; i < arrayUsers.length; i++) {
                    if (arrayUsers[i].id_user == parseInt(selectedElement.querySelector('.delete-selected-user').id)) {
                        arrayUsers.splice(i, 1);
                        selectedUlVar.removeChild(selectedElement);
                        break;
                    }
                }
            });
        }
        else {
            document.querySelector('.errorSelected').style.display = "inline";
        }
    }
    else {
        alert('ya esta en el grupo');
    }
}

function getAllUsersPerGroup(id_group, view) {
    $.ajax({
        url: getAllUsersGroup + "?id_group=" + id_group,
        method: "GET",
        contentType: 'application/json',
        success: function (response) {
            if (view == "main") {
                userList = document.querySelector('.user-list-group');
                userList.innerHTML = "";
                response.forEach(eachUser => {
                    let userDesign = userProfileDesign.cloneNode(true);

                    userDesign.querySelector('.user-profile-image').src = eachUser.profile_photo == "None" ? "/www/Public/img/default.png" : eachUser.profile_photo;

                    userDesign.querySelector('.user-profile-name').innerText = eachUser.username;

                    if (eachUser.id_user == getLocalStorageValue("id_user")) {
                        userDesign.querySelector('.user-profile-name').innerHTML += "<span class='text-success ms-2 fw-bold'>YOU</span>";
                    }
                    if (getLocalStorageValue("id_user") == groupManager) {
                        userDesign.querySelector('.delete-user-from-group').style.display = "flex";
                        userDesign.querySelector('.delete-user-from-group').id = eachUser.id_user;
                        userDesign.querySelector('.delete-user-from-group').addEventListener('click', function () {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteUserFromGroup(eachUser.id_user, actualGroup);
                                }
                            });
                        });
                    }
                    userList.append(userDesign);
                });
            }
            else if(view == "list"){
                let select_list = document.querySelector('.list-user');
                select_list.innerHTML = "";
                response.forEach(select_user => {
                    let eachOption = document.createElement('option');
                    eachOption.innerText = select_user.username;
                    eachOption.value = select_user.id_user;
                    select_list.append(eachOption);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function changeMode(mode, id_user){
    $.ajax({
        url: darkModeChange + "?modeSelection=" + mode + "&id_user=" + id_user,
        method: "PUT",
        contentType: 'application/json',
        success: function (response) {
            darkModeVar = response.darkmode;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}