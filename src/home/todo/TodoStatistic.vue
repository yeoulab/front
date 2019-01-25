<template>
  <div>
    <el-progress type="circle" :percentage=todoRates></el-progress>
    <!-- <label>오늘의 진도</label> -->
  </div>
</template>
<script>
// vuex 를 위한 import
import {mapState, mapActions, mapGetters} from 'vuex';

export default{
    computed: {
        ...mapGetters('todos',{
            todos: 'currentTodo',
            completedTodos: 'completedTodo',
            todoRates: 'todoRates',
        })
    },
    methods: {

    }
}
</script>
<style>
</style>
