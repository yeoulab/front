<template>
    <div id="current-todos" class="container">
        <!-- <h6 v-if="todos.length > 0">할 일({{todos.length}})</h6>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                {{todo.todoName}}
                <div class="btn-group">
                    <el-button v-on:click="completeTodo(todo)" type="success" icon="el-icon-check" circle></el-button>
                    <el-button v-on:click="remove(todo)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
            </li>
        </ul> -->
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="green" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>할 일({{todos.length}})</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>check_circle</v-icon>
                </v-btn>
                </v-toolbar>

                <v-list two-line>
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
                        <v-list-tile-action-text>click here</v-list-tile-action-text>
                        <v-layout row>
                            <v-btn icon ripple v-on:click="completeTodo(todo)">
                                <v-icon>done_outline</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon ripple v-on:click="remove(todo)">
                                <v-icon>remove_circle_outline</v-icon>
                            </v-btn>
                        </v-layout>
                        
                        <!-- <v-icon
                        v-if="selected.indexOf(index) < 0"
                        color="grey lighten-1"
                        >
                        done_outline
                        </v-icon>

                        <v-icon
                        v-else
                        color="yellow darken-2"
                        >
                        done_outline
                        </v-icon> -->
                    </v-list-tile-action>

                    </v-list-tile>
                    <v-divider
                    v-if="index + 1 < todos.length"
                    :key="index"
                    ></v-divider>
                </template>
                </v-list>
            </v-card>
            </v-flex>
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
<style lang="scss">
    .list-group-item{
        list-style: none;
        /*margin: 5px;
        padding: 5px; */
        vertical-align: middle;
    }
    .btn-group{
        float: right;
        /* vertical-align: middle; */
    }
    .scroll-area {
    position: relative;
    margin: auto;
    width: 400px;
    height: 300px;
    }
</style>
