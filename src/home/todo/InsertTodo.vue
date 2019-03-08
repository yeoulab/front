<template>
  <div>
    <TodoDate></TodoDate>
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
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
