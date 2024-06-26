const local_server = "https://localhost:44358/api/"
const public_server = "https://WilliamDiaz.bsite.net/api/"

const env = public_server

//FIREBASE API CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyATgI-CjUdvqPs4rr_Q5zlMVd85CSnqY1I",
    authDomain: "com.uttn.katcher",
    projectId: "apikatcherstorage",
    storageBucket: "apikatcherstorage.appspot.com",
    messagingSenderId: "260436583498",
    appId: "1:260436583498:android:4e027bad782a35265db2b3"
}

//USERS API
const loginUser = env + "users/login"
const createUser = env + "users"
const getUser = env + "users/"
const updateUser = env + "users/"
const searchUser = env + "users/searchUser"
const getAllUsersGroup = env + "users/getAllUserGroups"
const darkModeChange = env + "users/darkmodechange"

//GROUPS API
const createGroup = env + "groups"
const updateImageGroup = env + "groups/updateImage"
const getUserGroups = env + "groups/getgroups"
const getOneGroup = env + "groups/";
const getManager = env + "groups/getManager"
const updateGroup = env + "groups/"

//USER_GROUPS API
const userGroupsAdd = env + "users_groups"
const existUser = env + "users_groups/existsUser"
const deleteUser = env + "users_groups/"


//TASKS API
const addTask = env + "tasks"
const removeTask = env + "tasks/"
const completedUpdate = env + "tasks/changeCompleted"

//AGENDAS API
const addAgenda = env + "agenda"
const getAllAgendas = env + "agenda/getAgendasInfo"
const removeAgenda = env + "agenda/"


