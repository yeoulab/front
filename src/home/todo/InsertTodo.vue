<template>
  <div>
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
    <TodoDate></TodoDate>
  </div>
</template>
<script>
import TodoDate from './TodoDate.vue'
import GetTodo from './GetTodo.vue'
import CurrentTodos from './CurrentTodos.vue'

export default {
  components: {
    TodoDate,
    GetTodo,
    CurrentTodos,
  }
}
</script>
<style>

</style>
