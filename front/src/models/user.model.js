import {handleResponse} from "../heplers/handlerResponse";

/**
 * запрос на ручку регистрации
 * @param user
 * @returns {Promise<Response>}
 */
function register(user){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return fetch(`signup`, requestParams).then(handleResponse);
}

/**
 * запрос на ручку логина
 * @param user
 * @returns {Promise<Response>}
 */
function login(user){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return fetch(`signin`, requestParams)
        .then(handleResponse)
        .then((user) => {
            console.log(user);
            localStorage.removeItem("user");
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

/**
 * запрос на ручку изменения профиля
 * @param user
 * @returns {Promise<Response>}
 */
function changeProfile(user){
    const requestParams = {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user.user)
    }

    return fetch(`user/${user.id}`, requestParams)
        .then(handleResponse)
        .then((newUser) => {
            logout();
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
}

/**
 * запрос на ручку пользователя
 * @param id
 * @returns {Promise<Response>}
 */
function getUser(id){
    const requestParams = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }

    return fetch(`user/${id}`, requestParams)
        .then(handleResponse)
        .then((newUser) => {
            return newUser;
        });
}

function addUser(data){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_login: data.login,
            org_name: data.orgName,
            status: data.positionName
        })
    };
    return fetch(`/add-user`, requestParams).then(handleResponse)
}

/**
 * удаляем из localStorage пользователя
 */
function logout(){
    localStorage.removeItem('user');
}

export const userModel = {
    register,
    login,
    logout,
    changeProfile,
    getUser,
    addUser
}
