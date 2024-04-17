/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

let appRender, appNav, groupRender, manageGroupRender, darkModeVar = false;

let groupDesignModule, foundUserModule, selectedUserModule, userProfileDesign, taskDesignModule;

let actualGroup, verifyUserExist, groupManager;

let sfxAudio = document.querySelector('.sfx-audio');

document.addEventListener('deviceready', onDeviceReady, false);

function loadPartialView(viewName, divClass = null, isAppend = null) {
    $.ajax({
        url: 'Views/' + viewName + '.html',
        method: 'GET',
        success: function (data) {
            divClass === null ? console.error('Elemento contenedor (divClass) no definido') : (isAppend ? $(divClass).append(data) : $(divClass).html(data));
        },
        error: function (xhr, status, error) {
            console.error('Error al cargar la vista parcial: ', error)
        }
    });
}

function saveLocalStorageValue(name, value) {
    window.localStorage.setItem(name, value);
    return console.log(name + " guardado exitosamente.")
}

function getLocalStorageValue(name) {
    return window.localStorage.getItem(name);
}

function removeLocalStorageValue(name) {
    window.localStorage.removeItem(name);
    return console.log(name + " eliminado exitosamente.")
}

function preloadModule(viewName) {
    return $.get('Views/modules/submodules/' + viewName + '.html').then(html => $(html)[0]);
}

preloadModule("group_design")
    .done(function (data) {
        groupDesignModule = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

preloadModule("found_user_module")
    .done(function (data) {
        foundUserModule = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

preloadModule("selected_user")
    .done(function (data) {
        selectedUserModule = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

preloadModule("userprofile_design")
    .done(function (data) {
        userProfileDesign = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

preloadModule("task_design")
    .done(function (data) {
        taskDesignModule = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });


function errorAlert(type) {
    if (type == "empty") {
        Swal.fire({
            title: 'Error',
            text: 'You must fill all the fields!',
            icon: 'error',
            confirmButtonText: 'Got it',
        });
    }
    else if (type == "characters") {
        Swal.fire({
            title: 'Error',
            text: 'The password must be 6 characters minimum',
            icon: 'error',
            confirmButtonText: 'Got it'
        });
    }
    else if(type == "selected"){
        Swal.fire({
            title: 'Error',
            text: 'You haven\'t selected users yet!',
            icon: 'error',
            confirmButtonText: 'Got it'
        });
    }
}

function successAlert(type) {
    if (type == "update") {
        Swal.fire({
            title: 'Changes saved',
            text: 'The changes of your account have been saved succesfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if (type == "photo") {
        Swal.fire({
            title: 'Photo changed',
            text: 'Your profile photo has been changed succesfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if (type == "group") {
        Swal.fire({
            title: 'Group created',
            text: 'The group was created successfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if (type == "deleteUser") {
        Swal.fire({
            title: 'User deleted',
            text: 'The user was deleted from the group successfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if (type == "addUsers") {
        Swal.fire({
            title: 'Users added',
            text: 'Users were added to the group successfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if(type == "task"){
        Swal.fire({
            title: 'Task created',
            text: 'The task was created successfully',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if(type == "completed"){
        Swal.fire({
            title: 'Task completed',
            text: 'The task was marked as completed successfully',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if(type == "group_updated"){
        Swal.fire({
            title: 'Group updated',
            text: 'The group was updated successfully',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
}

function sfxPlay(type) {
    if (type == "success") {
        sfxAudio.src = "Public/audio/success_sound.mp3";
        sfxAudio.play();
    }
    else if (type == "button") {
        sfxAudio.src = "Public/audio/button_sound.mp3";
        sfxAudio.play();
    }
}

function getTodayDate() {
    var fechaActual = new Date();

    var año = fechaActual.getFullYear();

    var mes = fechaActual.getMonth() + 1;

    var dia = fechaActual.getDate();

    var fechaYHoraActual = año + '-' + mes + '-' + dia;

    return fechaYHoraActual;
}


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
