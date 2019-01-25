//----------------------------------------------------
// 2018.11.07
// todo.module.js
// state, mutation, actions, getter 관리
//-----------------------------------------------------
import { todosService } from '../_services';
import { commonFunc } from '../_helpers';

var todoToday = new Date().toISOString().slice(0, 10);
console.log("todos.module.js - todoDay : " + todoToday);
const user = JSON.parse(localStorage.getItem('user'));
// document.getElementById("todoDate").value = res;

const state = {
        todos: [], // 할일
        completedTodos: [], // 한일
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
            todoName: todo.todoName,
            completed: todo.completed,
            todoId: todo.todoId, // todo 의 mongodb ID
            completedTodoId: todo.completedTodoId, // completed의 mongodb ID
            addYn: false,
            delYn: false,
        });
    },
    LIST_COMPLETED_TODO(state, todo) {
        state.completedTodos.push({
            completedDate: todo.completedDate,
            todoName: todo.todoName,
            todoId: todo.todoId,
            completedTodoId: todo.completedTodoId,
            guid: todo.guid,
            userId: user._id,
            addYn: false,
            delYn: false,
        })
    },
    // GetTodo.vue 에서 ADD 할 때
    ADD_TODO(state) {
        let guid = commonFunc.guid();
        console.log("guid : " + guid);
        console.log(user);

        state.todos.push({
            todoName: state.newTodo,
            //completed: false,
            todoId: '',
            //completedTodoId: '',
            userId: user._id,
            guid: guid, // 내부적으로 관리하는 guid
            addYn: true, // DB 에 저장할 대상
            delYn: false, // DB 에 삭제할 대상

        });
    },
    // 재조회 시 list 초기화
    REMOVE_TODO_LIST(state) {
        state.todos = [];
        state.completedTodos = [];
    },
    // 필요한가?
    EDIT_TODO(state, todo) {
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
        state.todos = todos
        state.newTodo = todo.todoName
    },
    REMOVE_TODO(state, todo) {
        var afTodo = todo;
        afTodo.delYn = true;

        var todos = state.todos;
        todos.splice(todos.indexOf(todo), 1, afTodo);
        state.todos = todos;

        console.log("REMOVE_TODO");
        console.log(state.todos[0]);
    },
    REMOVE_TODO_BY_GUID(state, todo) {
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1);
        state.todos = todos;
    },
    COMPLETE_TODO(state, todo) {
        //todo.completed = true;
        state.completedTodos.push({
            todoName: todo.todoName,
            todoId: todo.todoId,
            completedTodoId: todo.completedTodoId,
            guid: todo.guid,
            userId: todo.userId,
            completedDate: state.todoDate,
            addYn: true,
            delYn: false,
        })
    },
    REMOVE_COMPLETED_TODO_BY_ID(state, todo) {
        var afCompletedTodos = state.completedTodos;
        afCompletedTodos.splice(afCompletedTodos.indexOf(todo), 1);
        state.completedTodos = afCompletedTodos;
    },
    REMOVE_COMPLETED_TODO(state, todo) {
        var afTodo = todo;
        afTodo.delYn = true;

        var afCompletedTodos = state.completedTodos;
        afCompletedTodos.splice(afCompletedTodos.indexOf(todo), 1, afTodo);
        state.completedTodos = afCompletedTodos;
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
        console.log("##### searchTodo ####### : " + id);
        let todoById = {
                todoName: '',
                todoId: '',
                completedId: '',
            },
            completedTodoById = {
                completedDate: '',
                todoName: '',
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
                        console.log("오늘 : " + state.todoDate);
                        for (var i = 0; i < response.length; i++) {
                            todoById.todoName = response[i].todoName;
                            todoById.todoId = response[i]._id;
                            // complete 된 건은 true 로 바꿔준다
                            for (var j = 0; j < rs[0].todos.length; j++) {
                                if (rs[0].todos[j].todoId === todoById.todoId) {
                                    todoById.completed = true;
                                    todoById.completedTodoId = rs[0].todos[j]._id;
                                }
                            }
                            commit('LIST_TODO', todoById);
                        }
                        for (var j = 0; j < rs[0].todos.length; j++) {
                            completedTodoById.completedDate = rs[0].completedDate;
                            completedTodoById.todoName = rs[0].todos[j].todoName;
                            completedTodoById.todoId = rs[0].todos[j].todoId;
                            completedTodoById.completedId = rs[0].todos[j]._id;
                            completedTodoById.guid = rs[0].todos[j].guid;
                            commit('LIST_COMPLETED_TODO', completedTodoById);
                        }
                    })
            });
    },
    // 조회하기
    searchCurrentTodo({ commit }, id) {
        let todoById = {
                todoName: '',
                todoId: '',
                completedId: '',
            },
            completedTodoById = {
                todoName: '',
                todoId: '',
                completedId: '',
            }

        // 서버에서 할일을 가져옴
        todosService.getByUserId(id)
            .then(response => {
                // 기존 todo all clear
                commit('REMOVE_TODO_LIST');
                for (var i = 0; i < response.length; i++) {
                    todoById.todoName = response[i].todoName;
                    todoById.todoId = response[i]._id;
                    commit('LIST_TODO', todoById);
                }
            });
    },
    // GetTodo.vue 에서 호출
    addTodo({ dispatch, commit }, todo) {

        // vuex 에 ADD
        commit('ADD_TODO')

        // todosService.createTodo(todo)
        //     .then(response => {
        //         setTimeout(() => {
        //             // 투두를 등록하고 나서 재조회
        //             dispatch('searchCurrentTodo', user._id);
        //             // commit('ADD_TODO');
        //         })
        //     }, error => {
        //         // 에러메세지 추가할 것
        //     });
    },
    // editTodo({ commit }, todo) {
    //     commit('EDIT_TODO', todo)
    // },
    removeTodo({ dispatch, commit }, todo) {

        // vuex 에서 관리
        if (todo.todoId === "") {
            commit('REMOVE_TODO_BY_GUID', todo);
        } else {
            commit('REMOVE_TODO', todo);
        }

        // commit('REMOVE_TODO', todo)
        // todosService.removeTodo(todo.todoId)
        //     .then((res) => {
        //         setTimeout(() => {
        //             dispatch('searchCurrentTodo', user._id);
        //         });
        //     });
    },
    completeTodo({ dispatch, commit }, todo) {

        // vuex 로 관리
        commit('COMPLETE_TODO', todo);

        // 오늘 날짜 추가
        // todo.completedDate = state.todoDate;
        // todosService.completeTodo(todo)
        //     .then(response => {
        //         setTimeout(() => {
        //             // 투두를 등록하고 나서 재조회
        //             dispatch('searchTodo', user._id);
        //             // commit('ADD_TODO');
        //         })
        //     }, error => {
        //         // 에러메세지 추가할 것
        //     });
    },
    rmCompletedTodo({ dispatch, commit }, todo) {
        console.log(todo);
        // 여기로는 4가지 조건이 있음
        //-------------------------------------------------------------------------
        // todoId   completedTodoId
        //   X             X          1) Todo 를 등록하고 complete까지
        //   X             O          불가능
        //   O             X          2) Todo 는 기등록되고, complete 처리
        //   O             O          3) Todo 는 기등록되고, complete 도 된 상태
        //-------------------------------------------------------------------------
        if (todo.todoId === "") {
            // 해당 todo 를 guid 로 mutation
            console.log("해당 todo 를 guid 로 mutation");
            commit('REMOVE_COMPLETED_TODO', todo);
        } else { //(todo.todoId != null) {
            if (todo.completedTodoId != null) { // 4) 인 경우
                // 해당 todo 를 Server 에서 삭제
                console.log("해당 todo 를 Server 에서 삭제");
                commit('REMOVE_COMPLETED_TODO', todo);
            } else { // 3) 인 경우
                // 해당 todo 를 todoId로 mutation
                console.log("해당 todo 를 todoId로 mutation");
                commit('REMOVE_COMPLETED_TODO', todo);
            }
        }
        console.log(todo);
        // todosService.rmCompletedTodo(todo)
        //     .then((response) => {
        //         setTimeout(() => {
        //             // 투두를 등록하고 나서 재조회
        //             dispatch('searchTodo', user._id);
        //             // commit('ADD_TODO');
        //         })
        //     }, error => {

        //     });
    },
    // clearTodo({ commit }) {
    //     commit('CLEAR_TODO')
    // },
    setTodoDate({ commit }, dt) {
        console.log("dt : " + dt);
        commit('SET_DATE', dt);
    },
    confirmTodos({ dispatch, state }) {
        console.log("confirmTodos Start");;
        console.log(state);
        todosService.confirmAllData(state)
            .then(rs => {
                // 투두를 등록하고 나서 재조회
                console.log("재조회 가능?");
                dispatch('searchTodo', user._id);
            });
    }
}

const getters = {
    completedTodo: state => {
        return state.completedTodos.filter(completedTodos => !completedTodos.delYn)
    },
    currentTodo: state => {
        return state.todos.filter(todos => !todos.delYn);
    },
    todoRates: () => {
        var completedTodos = state.completedTodos.filter(completedTodos => !completedTodos.delYn)
        var currentTodos = state.todos.filter(todos => !todos.delYn);

        return completedTodos.length / currentTodos.length * 100;
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
