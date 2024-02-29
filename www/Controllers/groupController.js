function addGroup(groupData, imageGroup){
    $.ajax({
        url: createGroup,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(groupData),
        success: function(response){
            var groupId = response.id_group;
            setGroupImage(imageGroup, groupId);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function setGroupImage(imageGroup, groupId){

    firebase.initializeApp(firebaseConfig);
            
    var storage = firebase.storage();
    var storageRef = storage.ref();
            
    var uploadTask = storageRef.child('KATCHER_STORAGE/Groups/' + "ID: " + groupId.toString()).put(imageGroup);

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
                var groupSetData = {
                    id_group: groupId,
                    group_image: downloadURL
                }

                uploadGroupImage(groupSetData);
            });
        }
    );
}

function uploadGroupImage(groupSetData){
    $.ajax({
        url: updateImageGroup,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(groupSetData),
        success: function(response){
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}