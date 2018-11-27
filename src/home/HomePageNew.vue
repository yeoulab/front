<template>
  <div>
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
    <CompletedTodos></CompletedTodos>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
    <!--<p>{{ user }}</p>-->
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