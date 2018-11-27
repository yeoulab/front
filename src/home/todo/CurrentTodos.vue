<template>
    <div id="current-todos" class="container">
        <h3 v-if="todos.length > 0">Current({{todos.length}})</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                {{todo.body}}
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
import {mapState, mapActions} from 'vuex';
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
            }
        }
    },
    created() {
        console.log('CurrentTodos => created');
        console.log("user._id : " + this.user._id);
        this.searchTodo(this.user._id);
    },
    methods: {
        ...mapActions('todos', {
            edit: 'editTodo',
            complete: 'completeTodo',
            remove: 'removeTodo',
            searchTodo: 'searchTodo',
        }),
        completeTodo(){
            this.inpTodo.todoName = this.todo.todoName;
            this.inpTodo.todoId = this.todo.todoId;
            this.inpTodo.userId = this.user._id;
            this.complete(this.inpTodo);
        }
        // edit(todo){
        //     this.$store.dispatch('editTodo', todo)
        // },
        // complete(todo){
        //     this.$store.dispatch('completeTodo', todo)
        // },
        // remove(todo){
        //     this.$store.dispatch('removeTodo', todo)
        // }
    },
    computed: {
        ...mapState({
            todos: state => state.todos.todos,
            user: state => state.account.user,
        })
        // todos(){
        //     return this.$store.getters.todos
        // }
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>