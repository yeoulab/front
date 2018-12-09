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
    completeTodo
};

let user = {};
let token = '';
// token 을 어떻게 전역으로 관리할 수 있을까..
function createTodo(todo) {
    console.log("createTodo start");
    console.log(`${config.apiUrl}/todos/create`);
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return axios.post(`${config.apiUrl}/todos/create`, {todo})
    .then().catch();
}

function getUserToken(){
  user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return user.token;
}

function getByUserId(id) {
    console.log("getByUserId Start")
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(`${config.apiUrl}/todos/${id}`)
    .then((response) => {
        console.log("response.data ↓↓↓↓↓↓");
        console.log(response.data);
        return response.data;
    });
}

function completeTodo(todo) {
    console.log("completeTodo start");
    token = getUserToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return axios.post(`${config.apiUrl}/todos/create`, {todo})
    .then().catch();
}

