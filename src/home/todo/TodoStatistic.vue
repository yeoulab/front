<template>
  <div class="chart">
    <el-progress type="circle" color="#8e71c7" :percentage="todoRates"></el-progress>
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
.chart{
  /* position:absolute;
  top: 200px;
  left: 20px; */
}
</style>
