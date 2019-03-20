<template>
  <div>
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
</style>