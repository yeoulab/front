<template>
  <div id="confirm-todo">
    <CompletedTodo></CompletedTodo>
    <Confirm></Confirm>
  </div>
</template>
<script>
import Confirm from './Confirm.vue';
import CompletedTodo from './CompletedTodos.vue';

export default{
    components: {
        Confirm,
        CompletedTodo,
    }
}
</script>
<style>
#confirm-todo{
  display: flex;
  flex-direction: column;
}
CompletedTodo{
  width: 500px;
}
</style>