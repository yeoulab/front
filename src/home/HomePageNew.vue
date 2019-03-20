<template>
  <div class="todoList">
    <header>
      <top-menu></top-menu>
    </header>
    <section class="main">
      <router-view></router-view>
    </section>
    <footer>
      <BottomMenu 
        v-on:goToCurrent="goToCurrent"
        v-on:goToDone="goToDone"
        v-on:goToChart="goToChart">
      </BottomMenu>
    </footer>
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
      this.$router.push("/home/complete");
    },
    goToChart(){
      this.$router.push("/home/chart");
    }
  }
}
</script>
<style>
.todoList{
  display: flex;
  flex-direction: column;
}
header{
  margin-bottom: 20px;
}
</style>
