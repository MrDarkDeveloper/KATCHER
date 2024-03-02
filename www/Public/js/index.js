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

let appRender, appNav, darkModeVar;

let groupDesignModule;

document.addEventListener('deviceready', onDeviceReady, false);

function loadPartialView(viewName, divClass = null, isAppend = null){
    $.ajax({
        url: '/www/Views/' + viewName + '.html',
        method: 'GET',
        success: function(data){
            divClass === null ? console.error('Elemento contenedor (divClass) no definido') : (isAppend ? $(divClass).append(data) : $(divClass).html(data));
        },
        error: function(xhr, status, error){
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
    return $.get('/www/Views/modules/submodules/' + viewName + '.html').then(html => $(html)[0]);
}

preloadModule("group_design")
    .done(function(data) {
        groupDesignModule = data;
    })
    .fail(function(xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

function errorAlert(type){
    if(type == "empty"){
        Swal.fire({
            title: 'Error',
            text: 'You must fill all the fields!',
            icon: 'error',
            confirmButtonText: 'Got it',
        });
    }
    else if(type == "characters"){
        Swal.fire({
            title: 'Error',
            text: 'The password must be 6 characters minimum',
            icon: 'error',
            confirmButtonText: 'Got it'
        });
    }
}

function successAlert(type){
    if(type == "update"){
        Swal.fire({
            title: 'Changes saved',
            text: 'The changes of your account have been saved succesfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
    else if(type == "photo"){
        Swal.fire({
            title: 'Photo changed',
            text: 'Your profile photo has been changed succesfully!',
            icon: 'success',
            confirmButtonText: 'Got it'
        });
    }
}


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
