<template>
  <div class="column">
    <h2>{{ title }}</h2>
    <div class="tasks">
      <div v-for="task in tasks" :key="task.id" class="task">
        <!-- if the task is being edited then show edit form which is basically triggered when user clicks edit button on the task-->
        <div v-if="editingTaskId === task.id" class="edit-form">
          <input v-model="editedTitle" placeholder="Task title">
          <textarea v-model="editedDescription" placeholder="Task description"></textarea>
          <!-- save and cancel edit buttons on edit task -->
          <div class="edit-actions">
            <button @click="saveEdit(task.id)" class="save-btn">Save</button>
            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
          </div>
        </div>
        <!-- this is else case -->
        <div v-else>
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <div class="actions">
            <!-- previous column -->
            <button 
              v-if="column !== 'todo'" 
              @click="$emit('move-task', task.id, 'backward')"
              class="move-btn"
            >←</button>
            <!-- Edit button. when clicked it calls the startEdit method -->
            <button 
              class="edit-btn"
              @click="startEdit(task)"
            >
              Edit
            </button>
            <!-- cancel button -->
            <button 
              class="delete-btn"
              @click="$emit('delete-task', task.id)"
            >
              Delete
            </button>
            <!-- next column -->
            <button 
              v-if="column !== 'done'" 
              @click="$emit('move-task', task.id, 'forward')"
              class="move-btn"
            >→</button>
          </div>
        </div>
      </div>
      <div v-if="!tasks.length" class="empty">No tasks</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: {
    title: String,
    tasks: Array,
    column: String
  },
  data() {
    return {
      editingTaskId: null,
      editedTitle: '',
      editedDescription: ''
    }
  },
  methods: {
  //initializes the values and displays in the edit form -->
    startEdit(task) {
      this.editingTaskId = task.id
      this.editedTitle = task.title
      this.editedDescription = task.description
    },
    // emits an 'edit-task' event to the parent adn also passes an object.
    saveEdit(taskId) {
      if (this.editedTitle.trim() && this.editedDescription.trim()) {
        this.$emit('edit-task', {
          id: taskId,
          title: this.editedTitle.trim(),
          description: this.editedDescription.trim()
        })
        //It resets the edit mode
        this.cancelEdit()
      }
    },
    cancelEdit() {
      this.editingTaskId = null
      this.editedTitle = ''
      this.editedDescription = ''
    }
  }
}
</script>

<style scoped>
.column {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  flex: 1;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.task h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.task p {
  margin: 0 0 10px 0;
  color: #666;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
}

.actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.move-btn {
  background: #ddd;
}

.edit-btn {
  background: #2196F3;
  color: white;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.empty {
  text-align: center;
  color: #999;
  padding: 20px 0;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-form textarea {
  height: 60px;
  resize: vertical;
}

.edit-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.save-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #9e9e9e;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>