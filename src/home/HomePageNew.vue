<template>
  <div>
    <TodoDate></TodoDate>
    <GetTodo></GetTodo>
    <br>
    <CurrentTodos></CurrentTodos>
    <br>
    <CompletedTodos></CompletedTodos>
    <br>
    <div><b-button to="/login">로그아웃</b-button></div>
    <!--<p>{{ user }}</p>-->
  </div>
</template>
<script>
import GetTodo from './todo/GetTodo.vue'
import CurrentTodos from './todo/CurrentTodos.vue'
import CompletedTodos from './todo/CompletedTodos.vue'
import TodoDate from './todo/TodoDate.vue'
import { mapState } from 'vuex';

export default {  
  components: {
    GetTodo,
    CurrentTodos,
    CompletedTodos,
    TodoDate,
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