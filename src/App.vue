<template>
  <div id="app">
    <h1>Task Manager</h1>
    <TaskBoard />
  </div>
</template>

<script>
import TaskBoard from './components/TaskBoard.vue'

export default {
  name: 'App',
  components: { TaskBoard }
}
</script>

<style>
#app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}
</style>