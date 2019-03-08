<template>
  <div class="todoList">
    <div class="topMenu">
      <TopMenu></TopMenu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="bottomMenu">
      <BottomMenu 
        v-on:goToCurrent="goToCurrent"
        v-on:goToDone="goToDone"
        v-on:goToChart="goToChart">
      </BottomMenu>
    </div>
    <!--
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
    -->
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
import BottomMenu from './BottomMenu.vue'
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
    BottomMenu,
  },
  created(){
    this.$router.push("/home/current");
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
    })
  },
  methods: {
    goToCurrent(){
      this.$router.push("/home/current");
    },
    goToDone(){

    },
    goToChart(){
      this.$router.push("/home/chart");
    }
  }
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
.main{
  /* center align */
  position: absoulte;
  margin-top: 80px;
  /* width: 80%; */
  /* position: absolute; */
  /* top: 150px; */
}
.bottomMenu{
  position: absolute;
  /* left: 0; */
  bottom: 0;
  width: 90%;
  /* top: 100px; */
}
.todo{
  position:absolute;
  top: 100px;
  left: 50px;
  /* transform:translate(-50%, 0%) */
}
.todoChart{
  position:absolute;
  width: 200px;
  top: 70px;
  left: 50px;
}
</style>
