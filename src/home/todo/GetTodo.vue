<template>
    <div id="get-todo" class="container">
        <!-- :value 를 쓸 경우, computed 의 ...mapState 를 설정해주면 됨 
             v-model 은 get/set 이 있어야 함 -->
        <div>
            <el-autocomplete v-model="newTodo">
                
            </el-autocomplete>
            <el-button v-on:click="addTodo" type="primary" icon="el-icon-edit" circle></el-button>
            <!-- <b-form-input type="text" v-model="newTodo" placeholder="새로운 할 일"></b-form-input> -->
            <!-- <b-button class="btn btn-default btn-sm" @click="addTodo">+</b-button> -->
        </div>
        <!-- {{ this.user._id }} -->
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
                    userId: '',
                    completed: false,
                }
            }
        },
        methods: {
            getTodo(e){
                console.log(this.newTodo);
                this.$store.commit('todos/GET_TODO', this.newTodo)
            },
            ...mapActions('todos', {
                createTodo: 'addTodo',
            }),
            addTodo(){
                console.log("Start addTodo");
                console.log(this.user);
                this.todo.todoName = this.newTodo;
                this.todo.userId = this.user._id;
                console.log("addTodo methods start");
                console.log(this.todo);
                this.createTodo(this.todo);
                this.newTodo = "";
            },

        },
        computed: {
            ...mapState({
                user: state => state.account.user,
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
<style>
/* input {
  font-family: "Courier New", Times, serif;
} */
</style>
