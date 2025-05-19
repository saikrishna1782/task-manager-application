<template>
<!-- this form handles taking two user inputs -->
  <form @submit.prevent="handleSubmit" class="form">
    <div>
      <!-- A text input for the task title -->
      <input
        v-model="title"
        placeholder="Task title"
        :class="{ error: errors.title }"
      >
      <span v-if="errors.title" class="error-text">{{ errors.title }}</span>
    </div>

    <div>
      <!-- Multi-line text box for the task description-->
      <textarea
        v-model="description"
        placeholder="Task description"
        :class="{ error: errors.description }"
      ></textarea>
      <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
    </div>

    <button type="submit">Add Task</button>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  data: () => ({
    title: '',
    description: '',
    errors: {}
  }),
  methods: {
    validate() {
      this.errors = {}
      //It checks if title is empty after trimming whitespace and sets the error.
      if (!this.title.trim()) {
        this.errors.title = 'Title is required'
      }
      //It checks if description is empty set the error.
      if (!this.description.trim())
      {
        this.errors.description = 'Description is required'
      }
      //Object.keys() is a method that returns an array of the keys of an object.
      return Object.keys(this.errors).length === 0
    },
    handleSubmit() {
      if (this.validate()) {
        //The component emits an custom event called 'add-task'.
        this.$emit('add-task', {
          title: this.title.trim(),
          description: this.description.trim()
        })
        this.title = ''
        this.description = ''
      }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 80px;
}

.error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 12px;
}

button {
  padding: 8px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style>