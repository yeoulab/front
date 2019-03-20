//-------------------------------------------
// 2018.11.07
// Todo 를 관리하는 Server 와 직접 송수신하는
// 프로그램 service.
// 호출 프로그램은 todos.module.js
//-------------------------------------------
import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const todosService = {
    createTodo,
    getByUserId,
    completeTodo,
    getCompleteByUserId,
    removeTodo,
    rmCompletedTodo,
    confirmAllData,
};

let user = {};
let token = '';

function confirmAllData(param) {
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    console.log(param);
    var todos = param.todos;
    var completedTodos = param.completedTodos;
    var payload = { todos, completedTodos };

    return new Promise((resolve, reject) => {
        console.log("promise 안에 있음");
        axios.post(`${config.apiUrl}/todos/confirm`, payload)
            .then((res) => {
                console.log("promise-res 안에 있음");
                if (res) {
                    console.log("promise-res-if 안에 있음");
                    resolve(res);
                }

                reject(new Error("save failed"));
            }).catch()
    });
}


// token 을 어떻게 전역으로 관리할 수 있을까..
function createTodo(todo) {
    console.log("createTodo start");
    console.log(`${config.apiUrl}/todos/create`);
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return new Promise((resolve, reject) => {
        axios.post(`${config.apiUrl}/todos/create`, { todo })
            .then((res) => {
                console.log(res);
                if (res) {
                    resolve(res);
                }

                reject(new Error("save failed"));
            }).catch();
    });

}

function removeTodo(todoId) {
    console.log("todoId : " + todoId);
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.post(`${config.apiUrl}/todos/remove`, { todoId: todoId }).then().catch();
}

function getUserToken() {
    user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    return user.token;
}

function getByUserId(id) {
    console.log("getByUserId Start")
    console.log("id는 : " + id);
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(`${config.apiUrl}/todos/${id}`)
        .then((response) => {
            return response.data;
        });
}

function completeTodo(todo) {
    console.log("completeTodo start");
    token = getUserToken();
    todo.completedDate = todo.completedDate.replace(/-/gi, "");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return axios.post(`${config.apiUrl}/complete`, { todo })
        .then().catch();
}

function rmCompletedTodo(todo) {
    console.log("remove completed Todo");
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.post(`${config.apiUrl}/complete/remove`, todo)
        .then().catch();
}

// user 의 complete 된 todo list
function getCompleteByUserId(id, dt) {
    console.log("getCompleteByUserId");
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    dt = dt.replace(/-/gi, "");

    return axios.get(`${config.apiUrl}/complete/${id}/${dt}`)
        .then((response) => {
            console.log("response.data ↓↓↓↓↓↓");
            console.log(response.data);
            return response.data;
        });
}