<template>
  <div>
    <!-- display task form -->
    <TaskForm @add-task="addTask" />
    <!-- displays 3 columns and has 3 events which will be triggered by child component based on what button use clicks -->
    <div class="board">
      <TaskColumn 
        title="To Do" 
        :tasks="todoTasks"
        @move-task="moveTask" 
        @delete-task="deleteTask"
        @edit-task="editTask"
        column="todo"
      />
      <TaskColumn 
        title="In Progress" 
        :tasks="inProgressTasks"
        @move-task="moveTask"
        @delete-task="deleteTask"
        @edit-task="editTask"
        column="inProgress"
      />
      <TaskColumn 
        title="Done" 
        :tasks="doneTasks"
        @move-task="moveTask"
        @delete-task="deleteTask"
        @edit-task="editTask"
        column="done"
      />
    </div>
  </div>
</template>

<script>
import TaskColumn from './TaskColumn.vue'
import TaskForm from './TaskForm.vue'

export default {
  name: 'TaskBoard',
  components: { TaskColumn, TaskForm },
  data: () => ({
    tasks: []
  }),

  //computed properties
  computed: {
    todoTasks() {
      return this.tasks.filter(task => task.status === 'todo')
    },
    inProgressTasks() {
      return this.tasks.filter(task => task.status === 'inProgress')
    },
    doneTasks() {
      return this.tasks.filter(task => task.status === 'done')
    }
  },
  methods: {
    addTask(newTask) {
      this.tasks.push({
        id: Date.now(),
        ...newTask, //includes title and description
        status: 'todo'
      })
    },

    //moves the tasks between columns
    moveTask(taskId, direction) {
      const task = this.tasks.find(t => t.id === taskId)
      if (!task) return

      const statusFlow = {
        todo: { forward: 'inProgress', backward: 'todo' },
        inProgress: { forward: 'done', backward: 'todo' },
        done: { forward: 'done', backward: 'inProgress' }
      }
      task.status = statusFlow[task.status][direction]
    },

    deleteTask(taskId) {
      // searches the array and returns the position of the task where task.id === taskId.
      const index = this.tasks.findIndex(task => task.id === taskId)
      //if task is found
      if (index !== -1) {
        // removes 1 task from the array at the position index.
        this.tasks.splice(index, 1)
      }
    },

    //for editing task
    editTask(editedTask) {
      const task = this.tasks.find(t => t.id === editedTask.id)
      if (task) {
        task.title = editedTask.title
        task.description = editedTask.description
      }
    }
  }
}
</script>

<style scoped>
.board {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .board {
    flex-direction: column;
  }
}
</style>