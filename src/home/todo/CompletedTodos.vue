<template>
    <div id="completed-todos" class="container">
        <h6 v-if="completed.length > 0">한 일({{completed.length}})</h6>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in completed" :key="todo.id">
                {{todo.body}}
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
            ...mapGetters('todos',{
                completed: 'completedTodo'
            })
        }

    }
</script>