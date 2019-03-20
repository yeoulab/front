<template>
    <div id="completed-todos">
        <v-layout row id="layout-top">
            <v-card id="completed-card">
                <v-toolbar color="pink" dark>
                    <v-toolbar-title>한 일({{completedTodos.length}})</v-toolbar-title>
                </v-toolbar>

                <v-list id="completed-list">
                    <template v-for="(todo, index) in completedTodos">
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
                            <v-btn fab dark small color="pink" v-on:click="rmCompletedTodo(todo)">
                                <v-icon dark>delete_forever</v-icon>
                            </v-btn>
                        </v-list-tile-action>

                        </v-list-tile>
                        <v-divider
                        v-if="index + 1 < completedTodos.length"
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
    export default {
    data() {
        return{
            completedTodoId: '',
        }
    },        
        methods: {
            ...mapActions('todos',{
                remove: 'rmCompletedTodo'
            }),
            //body: todo.todoName,
            //completed: true,
            //todoId: todo.todoId,
            //completedTodoId: todo.completedTodoId,
            //addYn: true,
            //delYn: false,
            rmCompletedTodo(todo){
                console.log("rmCompletedTodo Start");
                console.log(todo);

                this.completedTodoId = todo._id;
                this.remove(todo);
            }
            // remove(todo){
            //     this.$store.dispatch('removeTodo', todo)
            // }
        },
        computed: {
            // completed(){
            //     return this.$store.getters.completedTodos
            // },
            // ...mapState({
            //   completedTodos: state => state.todos.completedTodos,
            // }), 
            ...mapGetters('todos',{
                 completedTodos: 'completedTodo'
            })
        }
    }
</script>
<style>
    #layout-top{
        /* height: 400px; */
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
    
    #completed-list{
        height:400px;
        overflow-y: auto;
    }
    #completed-card{
        width: 100%;
    }
</style>
