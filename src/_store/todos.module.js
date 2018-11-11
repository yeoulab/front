//----------------------------------------------------
// 2018.11.07
// todo.module.js
// state, mutation, actions, getter 관리
//-----------------------------------------------------
import { todosService } from '../_services';

const state = {
      todos: [],
      newTodo: ''
    }
    
const mutations = {
      GET_TODO(state, todo){
        state.newTodo = todo
      },
      ADD_TODO(state){
        state.todos.push({
          body: state.newTodo,
          completed: false
        })
      },
      EDIT_TODO(state, todo){
         var todos = state.todos
         todos.splice(todos.indexOf(todo), 1)
         state.todos = todos
         state.newTodo = todo.body
      },
      REMOVE_TODO(state, todo){
         var todos = state.todos
         todos.splice(todos.indexOf(todo), 1)
      },
      COMPLETE_TODO(state, todo){
        todo.completed = !todo.completed
      },
      CLEAR_TODO(state){
        state.newTodo = ''
      }
     }

const actions = {
      getTodo({commit}, todo){
        commit('GET_TODO', todo)
      },
      addTodo({commit}, todo){
        //commit('registerRequest', user);
    
        todosService.createTodo(todo)
            .then(
              todo => {
                commit('ADD_TODO', todo);
                    //router.push('/login');
                    //setTimeout(() => {
                    //    // display success message after route change completes
                    //    dispatch('alert/success', 'Registration successful', { root: true });
                    //})
                },
                error => {
                    //commit('registerFailure', error);
                    //dispatch('alert/error', error, { root: true });
                    commit('REMOVE_TODO', todo)
                }
            ); 
        
      },
      editTodo({commit}, todo){
        commit('EDIT_TODO', todo)
      },
      removeTodo({commit}, todo){
        commit('REMOVE_TODO', todo)
      },
      completeTodo({commit}, todo){
       commit('COMPLETE_TODO', todo)
      },
      clearTodo({commit}){
        commit('CLEAR_TODO')
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