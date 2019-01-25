<template>
  <div class="todoList">
    <!-- <div class="menu">
      <Navigation></Navigation>
    </div> -->
    <div class="todoChart">
      <TodoStatistic></TodoStatistic>
    </div>
    <div class="todo">
      <TodoDate></TodoDate>
      <GetTodo></GetTodo>
      <br>
      <CurrentTodos></CurrentTodos>
      <br>
      <CompletedTodos></CompletedTodos>
      <br>
      <Confirm></Confirm>
      <br>
    </div>
    <div class="topMenu">
      <TopMenu></TopMenu>
    </div>
  </div>
</template>
<script>
import GetTodo from './todo/GetTodo.vue'
import CurrentTodos from './todo/CurrentTodos.vue'
import CompletedTodos from './todo/CompletedTodos.vue'
import TodoDate from './todo/TodoDate.vue'
import Confirm from './todo/Confirm.vue'
import Navigation from './Navigation.vue'
import TopMenu from './TopMenu.vue'
import TodoStatistic from './todo/TodoStatistic.vue'
import { mapState } from 'vuex';

export default {  

  components: {
    GetTodo,
    CurrentTodos,
    CompletedTodos,
    TodoDate,
    Confirm,
    Navigation,
    TopMenu,
    TodoStatistic,
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
    })
  },
}
</script>
<style>
  body {
    font-family: Helvetica, sans-serif;
  }

.topMenu{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0%;
}

.todo{
  position:absolute;
  width: 300px;
  top: 70px;
  left: 220px;
  /* top:50%; */
  /* left:50%; */
  /* transform:translate(-50%, 0%) */
}
.todoChart{
  position:absolute;
  width: 200px;
  top: 70px;
  left: 50px;
}

.menu{
  position:absolute;
  width: 200px;
  top: 70px;
  left: 0%;
}

</style>
