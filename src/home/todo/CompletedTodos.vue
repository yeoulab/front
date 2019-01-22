<template>
    <div id="completed-todos" class="container">
        <h6 v-if="completedTodos.length > 0">한 일({{completedTodos.length}})</h6>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in completedTodos" :key="todo.id">
                {{todo.todoName}}
                <div class="btn-group">
                    <button type="button" @click="rmCompletedTodo(todo)" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-remove-circle"></span> Remove
                    </button>
                </div>
            </li>
        </ul>
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