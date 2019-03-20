<template>
    <div id="current-todos" class="container">
        <v-layout row>
            <v-card id="todo-card">
                <v-toolbar color="pink" dark>
                    <v-toolbar-title>할 일({{todos.length}})</v-toolbar-title>
                </v-toolbar>

                <v-list id="todo-list">
                    <template v-for="(todo, index) in todos">
                        <v-list-tile
                        :key="todo.todoName"
                        avatar
                        ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ todo.todoName }}</v-list-tile-title>
                            <!-- <v-list-tile-sub-title class="text--primary">{{ todo.todoName }}</v-list-tile-sub-title> -->
                            <!-- <v-list-tile-sub-title>{{ todo.todoName }}</v-list-tile-sub-title> -->
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-layout row>
                                <v-btn fab dark small color="pink" v-on:click="completeTodo(todo)">
                                    <v-icon dark>done_outline</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn fab dark small color="pink" v-on:click="remove(todo)">
                                    <v-icon dark>remove_circle_outline</v-icon>
                                </v-btn>
                            </v-layout>
                        </v-list-tile-action>

                        </v-list-tile>
                        <v-divider
                        v-if="index + 1 < todos.length"
                        :key="index"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-layout>        
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
            },
            selected: [2],
        }
    },
    components: {
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
#current-todos{
    height: 500px;
}
#todo-list{
    height:500px;
    overflow-y: auto;
}
#todo-card{
    width: 100%;
}
</style>
