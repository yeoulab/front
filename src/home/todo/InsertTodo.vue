<template>
  <div id="insertTodo">
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
  </div>
</template>
<script>
import GetTodo from './GetTodo.vue'
import CurrentTodos from './CurrentTodos.vue'

export default {
  components: {
    GetTodo,
    CurrentTodos,
  }
}
</script>
<style>
.insertTodo{
  display: flex; 
}
</style>
