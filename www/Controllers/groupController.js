function addGroup(groupData, imageGroup) {
    $.ajax({
        url: createGroup,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(groupData),
        success: function (response) {
            var groupId = response.id_group;

            var userGroupData = {
                id_user: getLocalStorageValue("id_user"),
                id_group: groupId
            }
            addUserGroup(userGroupData);

            setGroupImage(imageGroup, groupId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setGroupImage(imageGroup, groupId) {

    firebase.initializeApp(firebaseConfig);

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var uploadTask = storageRef.child('KATCHER_STORAGE/Groups/' + "ID: " + groupId.toString()).put(imageGroup);

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
                var groupSetData = {
                    id_group: groupId,
                    group_image: downloadURL
                }

                uploadGroupImage(groupSetData);
            });
        }
    );
}

function uploadGroupImage(groupSetData) {
    $.ajax({
        url: updateImageGroup,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(groupSetData),
        success: function (response) {
            console.log(response);
            successAlert("group");
            sfxPlay("success");
            loadPartialView('modules/groups', appRender);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function getGroupsUser(userId) {
    $.ajax({
        url: getUserGroups + "?id=" + userId,
        method: "GET",
        contentType: 'application/json',
        success: function (response) {
            console.table(response);
            setGroupsData(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setGroupsData(response) {
    let groupsList = document.querySelector('.groups-list');
    groupsList.innerHTML = "";

    if(response.length > 0){
        response.forEach(group => {
            groupElement = groupDesignModule.cloneNode(true);
            groupsList.append(groupElement);
    
            thisGroup = groupsList.lastChild;
    
            thisGroup.querySelector('.group-color').style.background = group.group_background;
            thisGroup.querySelector('.group-image').src = group.group_image == "None" ? "/www/Public/img/default.png" : group.group_image;
            thisGroup.querySelector('.group-name').innerHTML = group.group_name;
            thisGroup.querySelector('.group-description').innerHTML = group.group_description;
            thisGroup.querySelector('.group-id').id = group.id_group;

            thisGroup.querySelector('.group-id').addEventListener('click', function(){
                actualGroup = group.id_group;
                groupManager = group.id_manager;
                loadPartialView('modules/group_view', appRender);
            });
    
        });
    }
    else{
        groupsList.innerHTML = "<h1>NO HAY</h1>"
    }
}

function getGroup(id, view){
    $.ajax({
        url: getOneGroup + id,
        method: "GET",
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            if(view == "main"){
                setDataGroupView(response);
                setGeneralViewData(response);
            }
            else if(view == "settings"){
                setSettingsInfo(response);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setDataGroupView(response){
    document.querySelector('.navbar-group').style.background = response.group_background;
    document.querySelector('.name-group').innerText = response.group_name;
    
    if(getLocalStorageValue("id_user") == response.id_manager){
        document.querySelector('.edit-group-btn').style.display = "block";
    }
}

function setGeneralViewData(response){
    document.querySelector('.group-description-view').innerText = response.group_description;
}

function setSettingsInfo(response){
    document.querySelector('.update-name').value = response.group_name;
    document.querySelector('.update-description').value = response.group_description;
    document.querySelector('#group-color-update').value = response.group_background;
    document.querySelector('#colorhex1update').value = response.group_background;
    if(response.group_image != "None"){
        document.querySelector('#imageView-update').src = response.group_image;
    }
    document.querySelector('.loadedFile').value = response.group_image;
}

function getGroupManager(id_group){
    $.ajax({
        url: getManager + "?id_group=" + id_group,
        method: "GET",
        contentType: 'application/json',
        success: function (response) {
            document.querySelector('.manager-group').innerHTML = "";
            let userDesign = userProfileDesign.cloneNode(true);
            userDesign.querySelector('.user-profile-image').src = response.profile_photo;
            userDesign.querySelector('.user-profile-name').innerText = response.username;

            if(response.id_user == getLocalStorageValue("id_user")){
                userDesign.querySelector('.user-profile-name').innerHTML += "<span class='text-success ms-2 fw-bold'>YOU</span>";
            }

            userDesign.querySelector('.delete-user-from-group').style.display = "none";
            document.querySelector('.manager-group').append(userDesign);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function updateGroupImage(imageGroup, groupName, groupDescription, groupColor) {

    firebase.initializeApp(firebaseConfig);

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var uploadTask = storageRef.child('KATCHER_STORAGE/Groups/' + "ID: " + actualGroup.toString()).put(imageGroup);

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
                var groupDataUpdated = {
                    group_name: groupName,
                    group_description: groupDescription,
                    group_background: groupColor,
                    group_image: downloadURL
                }

                updateGroupData(groupDataUpdated, actualGroup);
            });
        }
    );
}

function updateGroupData(groupDataUpdated, groupId){
    $.ajax({
        url: updateGroup + groupId,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(groupDataUpdated),
        success: function (response) {
            console.log(response);
            successAlert("group");
            sfxPlay("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}