<template>
  <div>
    <CurrentTodos></CurrentTodos>
    <CompletedTodos></CompletedTodos>
    <GetTodo></GetTodo>
    <p>{{ user }}</p>
  </div>
</template>
<script>
import GetTodo from './todo/GetTodo.vue'
import CurrentTodos from './todo/CurrentTodos.vue'
import CompletedTodos from './todo/CompletedTodos.vue'
import { mapState } from 'vuex';

export default {  
  components: {
    GetTodo,
    CurrentTodos,
    CompletedTodos
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
    })
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>