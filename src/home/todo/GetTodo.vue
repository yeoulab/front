<template>
    <div id="get-todo" class="container">
        <!-- :value 를 쓸 경우, computed 의 ...mapState 를 설정해주면 됨 
             v-model 은 get/set 이 있어야 함 -->
        <v-form>
            <v-container>
            <v-layout row wrap>

                <!-- <v-flex xs12> -->
                <v-text-field
                    v-model="newTodo"
                    box
                    clear-icon="mdi-close-circle"
                    clearable
                    label="To-do"
                    type="text"
                    @click:append="toggleMarker"
                    @click:append-outer="sendMessage"
                    @click:prepend="changeIcon"
                    @click:clear="clearMessage"
                ></v-text-field>
                <v-btn fab dark small color="indigo" v-on:click="addTodo">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <!-- </v-flex> -->
            </v-layout>
            </v-container>
        </v-form>
        <!-- <div>
            <el-input v-model="newTodo">                
            </el-input>
            <el-button v-on:click="addTodo" type="primary" icon="el-icon-edit" circle></el-button>
        </div> -->
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
                },
                password: 'Password',
                show: false,
                // message: 'Hey!',
                marker: true,
                iconIndex: 0,
                icons: [
                    'mdi-emoticon',
                    'mdi-emoticon-cool',
                    'mdi-emoticon-dead',
                    'mdi-emoticon-excited',
                    'mdi-emoticon-happy',
                    'mdi-emoticon-neutral',
                    'mdi-emoticon-sad',
                    'mdi-emoticon-tongue'
                ]
            }
        },
        methods: {
            toggleMarker () {
                this.marker = !this.marker
            },
            sendMessage () {
                this.resetIcon()
                this.clearMessage()
            },
            clearMessage () {
                this.message = ''
            },
            resetIcon () {
                this.iconIndex = 0
            },
            changeIcon () {
                this.iconIndex === this.icons.length - 1
                ? this.iconIndex = 0
                : this.iconIndex++
            },
            getTodo(e){
                console.log(this.newTodo);
                this.$store.commit('todos/GET_TODO', this.newTodo)
            },
            ...mapActions('todos', {
                createTodo: 'addTodo',
            }),
            addTodo(){
                this.todo.todoName = this.newTodo;
                this.todo.userId = this.user._id;
                this.createTodo(this.todo);
                this.newTodo = "";
            },

        },
        computed: {
            icon () {
                return this.icons[this.iconIndex]
            },
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
