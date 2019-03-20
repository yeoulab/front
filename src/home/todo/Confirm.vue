<template>
    <div id="confirm">
        <!-- <b-button @click="confirm">반영 ^_^</b-button> -->
        <!-- <el-button v-on:click="confirm">반영</el-button> -->
        <v-btn v-on:click="confirm" color="pink" block dark>반영</v-btn>
    </div>
</template>
<script>
    // vuex 를 위한 import
    import {mapState, mapActions, mapGetters} from 'vuex';

    export default {
        // todo 를 전달하기 위한 data 세팅
        // data() {
        //     return{
        //         todoDate: ''
        //     }
        // },
        created: () =>{
            console.log("todoDate Vue created called") 
        },
        mounted: () => {
            // var res = new Date().toISOString().slice(0,10);
            // document.getElementById("todoDate").value = res;
            // console.log("todoDate Vue mounted called")
        },
        updated: () =>{
            console.log("todoDate Vue updated called");
        },
        methods: {
            ...mapActions('todos', {
                confirmTodos: 'confirmTodos',
            }),
            confirm(){
                this.confirmTodos();
            }
        },
        computed: {
             ...mapGetters('todos',{
            todos: 'currentTodo',
            completedTodos: 'completedTodo',
        })
        }
}
</script>
