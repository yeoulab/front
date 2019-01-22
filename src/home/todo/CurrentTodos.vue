<template>
    <div id="current-todos" class="container">
        <h6 v-if="todos.length > 0">할 일({{todos.length}})</h6>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                {{todo.todoName}}
            <div class="btn-group">
                <!--
                <button type="button" @click="edit(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-edit"></span> Edit
                </button>
                -->
                <button type="button" @click="completeTodo(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Complete
                </button>
                <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex';
//import axios from 'axios';
import config from 'config';
/*
    todoName: { type: String, unique: true, required: true },
    completedDate: { type: Date, default: Date.now },
    userId: { type : String, required: true },
    todoId: { type : String, required: true }
*/
export default {
    data() {
        return{
            inpTodo: {
                todoName: '',
                userId: '',
                todoId: '',
                guid: '',
            }
        }
    },
    created() {
        this.searchTodo(this.user._id);
    },
    methods: {
        ...mapActions('todos', {
            edit: 'editTodo',
            complete: 'completeTodo',
            remove: 'removeTodo',
            searchTodo: 'searchTodo',
        }),
        completeTodo(todo){
            console.log("CurrentTodos-completeTodo Start");
            console.log(todo);
            this.inpTodo.todoName = todo.todoName;
            this.inpTodo.todoId = todo.todoId;
            this.inpTodo.userId = this.user._id;
            this.inpTodo.guid = todo.guid;
            this.complete(this.inpTodo);
        }
    },
    computed: {
        ...mapState({
            //todos: state => state.todos.todos,
            user: state => state.account.user,
            todoDate: state => state.todos.todoDate,
        }),
         ...mapGetters('todos',{
            todos: 'currentTodo'
        })
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>