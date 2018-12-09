<template>
    <div id="todo-date" class="container">
        <b-form-input type="date" id ="todoDate" v-model="todoDate"></b-form-input>
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
            var res = new Date().toISOString().slice(0,10);
            document.getElementById("todoDate").value = res;
            console.log("todoDate Vue mounted called")
        },
        updated: () =>{
            console.log("todoDate Vue updated called");
        },
        methods: {

        }
}
</script>