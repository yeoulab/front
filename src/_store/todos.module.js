//----------------------------------------------------
// 2018.11.07
// todo.module.js
// state, mutation, actions, getter 관리
//-----------------------------------------------------
import { todosService } from '../_services';

var todoToday = new Date().toISOString().slice(0, 10);
console.log("todos.module.js - todoDay : " + todoToday);
const user = JSON.parse(localStorage.getItem('user'));
// document.getElementById("todoDate").value = res;

const state = {
        todos: [],
        newTodo: '',
        todoDate: todoToday,
        userId: '',
    }
    // mutaion 중, LIST_TODO만 써야할듯
    // add / complete / remove 의 경우 tr 후, 재조회를 하기 때문에
const mutations = {
    // 필요한가????
    // 처리하려는 todo 를 무조건 넣어야 한다.
    GET_TODO(state, todo) {
        state.newTodo = todo
    },
    // 서버에서 가져온 todo state 에 저장
    LIST_TODO(state, todo) {
        state.todos.push({
            body: todo.body,
            completed: todo.completed,
            todoId: todo.todoId,
            completedTodoId: todo.completedTodoId,
        })
    },
    // GetTodo.vue 에서 ADD 할 때
    ADD_TODO(state) {
        state.todos.push({
            body: state.newTodo,
            completed: false,
        })
    },
    // 재조회 시 list 초기화
    REMOVE_TODO_LIST(state) {
        state.todos = [];
    },
    // 필요한가?
    EDIT_TODO(state, todo) {
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
        state.todos = todos
        state.newTodo = todo.body
    },
    REMOVE_TODO(state, todo) {
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
    },
    COMPLETE_TODO(state, todo) {
        todo.completed = true;
    },
    CLEAR_TODO(state) {
        state.newTodo = ''
    },
    SET_DATE(state, dt) {
        console.log(dt);
        state.todoDate = dt;
    },
    SET_USER(state, id) {
        state.userId = id;
    }
}

const actions = {
    getTodo({ commit }, todo) {
        commit('GET_TODO', todo)
    },
    // 조회하기
    searchTodo({ commit }, id) {
        let todoById = {
                body: '',
                completed: '',
                todoId: '',
                completedId: '',
            }
            // 서버에서 할일을 가져옴
        todosService.getByUserId(id)
            .then(response => {
                // 기존 todo all clear
                commit('REMOVE_TODO_LIST');
                todosService.getCompleteByUserId(id, state.todoDate)
                    .then(rs => {
                        console.log("완료된 투두 조회");
                        console.log(rs);
                        for (var j = 0; j < rs.length; j++) {

                        }
                        for (var i = 0; i < response.length; i++) {
                            todoById.body = response[i].todoName;
                            todoById.completed = false;
                            todoById.todoId = response[i]._id;
                            // complete 된 건은 true 로 바꿔준다.
                            for (var j = 0; j < rs.length; j++) {
                                if (rs[j].todoId === todoById.todoId) {
                                    todoById.completed = true;
                                    todoById.completedTodoId = rs[j]._id;
                                }
                            }
                            commit('LIST_TODO', todoById);
                        }
                    })
            });
    },
    // GetTodo.vue 에서 호출
    addTodo({ dispatch, commit }, todo) {

        todosService.createTodo(todo)
            .then(response => {
                setTimeout(() => {
                    // 투두를 등록하고 나서 재조회
                    dispatch('searchTodo', user._id);
                    // commit('ADD_TODO');
                })
            }, error => {
                // 에러메세지 추가할 것
            });
    },
    // editTodo({ commit }, todo) {
    //     commit('EDIT_TODO', todo)
    // },
    removeTodo({ dispatch, commit }, todo) {
        // commit('REMOVE_TODO', todo)
        todosService.removeTodo(todo.todoId)
            .then((res) => {
                setTimeout(() => {
                    dispatch('searchTodo', user._id);
                })
            })
    },
    completeTodo({ dispatch, commit }, todo) {
        // 오늘 날짜 추가
        todo.completedDate = state.todoDate;
        todosService.completeTodo(todo)
            .then(response => {
                setTimeout(() => {
                    // 투두를 등록하고 나서 재조회
                    dispatch('searchTodo', user._id);
                    // commit('ADD_TODO');
                })
            }, error => {
                // 에러메세지 추가할 것
            });
    },
    rmCompletedTodo({ dispatch, commit }, todo) {
        console.log(todo);
        todosService.rmCompletedTodo(todo)
            .then((response) => {
                setTimeout(() => {
                    // 투두를 등록하고 나서 재조회
                    dispatch('searchTodo', user._id);
                    // commit('ADD_TODO');
                })
            }, error => {

            });
    },
    // clearTodo({ commit }) {
    //     commit('CLEAR_TODO')
    // },
    setTodoDate({ commit }, dt) {
        console.log("dt : " + dt);
        commit('SET_DATE', dt);
    }
}

const getters = {
    completedTodo: state => {
        return state.todos.filter(todos => todos.completed)
    }
};
// const setters = {};

export const todos = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}