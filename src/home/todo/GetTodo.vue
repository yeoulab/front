<template>
    <div id="get-todo" class="container">
        <!-- :value 를 쓸 경우, computed 의 ...mapState 를 설정해주면 됨 
             v-model 은 get/set 이 있어야 함 -->
        <input class="form-control"
               v-model="newTodo"
               @change="getTodo"
               placeholder="I need to...">
        <button class="btn btn-primary" @click="addTodo">Add Todo</button>
    </div>
</template>
<script>
    // vuex 를 위한 import
    import {mapState, mapActions} from 'vuex';

    export default {
        // todo 를 전달하기 위한 data 세팅
        data() {
            return{
                todo: {
                    todoName: '',
                    userId: ''
                }
            }
        },
        methods: {
            getTodo(e){
                this.$store.commit('todos/GET_TODO', e.target.value)
            },
            ...mapActions('todos', {
                createTodo: 'addTodo'
            }),
            addTodo(){
                this.todo.todoName = this.newTodo;
                this.todo.userId = this.user._id;
                console.log("addTodo methods start");
                console.log(this.todo);
                this.createTodo(this.todo);
            },

        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            newTodo:{
                get() {
                    return this.$store.state.todos.newTodo;
                },
                set( value ){
                    this.$store.commit('todos/GET_TODO', value);
                }
            }
        }
}
</script>