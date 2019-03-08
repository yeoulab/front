<template>
    <div id="todo-date" class="container">
        <!-- <b-form-input type="date" id ="todoDate" aira-invalid="true" v-model="stdDate" @change="refreshTodo"></b-form-input> -->
        <el-date-picker v-model="stdDate" v-on:change="refreshTodo" type="date" ></el-date-picker>
    </div>
</template>
<script>
    // vuex 를 위한 import
    import {mapState, mapActions} from 'vuex';

    export default {
        // todo 를 전달하기 위한 data 세팅
        data() {
            return{
                todoDate: ''
            }
        },
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
            ...mapActions('todos', {refreshTodo: 'searchTodo'}),
        },
        computed: {
            // ...mapState({
            //     stdDate: state => state.todos.todoDate
            // }),
            stdDate:{
                // v-model 에서 사용하는 stdDate 는
                // todos 의 vuex 상태 todoDate에서 가져오고
                get() {
                    console.log("stdDate : get");
                    return this.$store.state.todos.todoDate;
                },
                // todos 의 SET_DATE 라는 mutation 으로 값을 변경한다.
                set( value ){
                    console.log("stdDate set value : " + value);
                    this.$store.commit('todos/SET_DATE', value);
                }
            }
        }
}
</script>
