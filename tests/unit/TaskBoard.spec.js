import { shallowMount } from '@vue/test-utils'
import TaskBoard from '@/components/TaskBoard.vue' // Adjust the path based on your project

describe('TaskBoard.vue', () => {
  it('adds a new task to the tasks array', () => {
    const wrapper = shallowMount(TaskBoard)

    // Define a new task input
    const newTask = {
      title: 'Test Task',
      description: 'Test Description'
    }

    // Call the method
    wrapper.vm.addTask(newTask)

    // Expectations
    expect(wrapper.vm.tasks).toHaveLength(1)
    expect(wrapper.vm.tasks[0]).toMatchObject({
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo' // assuming addTask adds this default value
    })
  })
   it('moves a task forward in status', () => {
    const wrapper = shallowMount(TaskBoard)

    // Set up a task in the "todo" column
    wrapper.vm.tasks = [
      { id: 1, title: 'Task 1', description: '', status: 'todo' }
    ]

    // Move it forward to "inProgress"
    wrapper.vm.moveTask(1, 'forward')
    expect(wrapper.vm.tasks[0].status).toBe('inProgress')

    // Move it forward to "done"
    wrapper.vm.moveTask(1, 'forward')
    expect(wrapper.vm.tasks[0].status).toBe('done')
  })


  it('deletes the task with the given ID', () => {
    const wrapper = shallowMount(TaskBoard)

    // Add 2 tasks manually
    wrapper.vm.tasks = [
      { id: 1, title: 'Task 1', description: 'A', status: 'todo' },
      { id: 2, title: 'Task 2', description: 'B', status: 'todo' }
    ]

    // Call deleteTask for id 1
    wrapper.vm.deleteTask(1)

    // Expect only one task left, and it should be the one with id 2
    expect(wrapper.vm.tasks.length).toBe(1)
    expect(wrapper.vm.tasks[0].id).toBe(2)
  })

  it('does nothing if the task ID is not found', () => {
    const wrapper = shallowMount(TaskBoard)

    wrapper.vm.tasks = [
      { id: 1, title: 'Task 1', description: 'A', status: 'todo' }
    ]

    // Call deleteTask with a non-existent ID
    wrapper.vm.deleteTask(999)

    // The task array should remain unchanged
    expect(wrapper.vm.tasks.length).toBe(1)
    expect(wrapper.vm.tasks[0].id).toBe(1)
  })

  it('updates the title and description of the task with the given ID', () => {
    const wrapper = shallowMount(TaskBoard)

    // Setup: One task
    wrapper.vm.tasks = [
      { id: 1, title: 'Old Title', description: 'Old Desc', status: 'todo' }
    ]

    // Action: Edit task
    const updatedTask = { id: 1, title: 'New Title', description: 'New Desc' }
    wrapper.vm.editTask(updatedTask)

    // Assertion
    const task = wrapper.vm.tasks[0]
    expect(task.title).toBe('New Title')
    expect(task.description).toBe('New Desc')
  })

  it('does nothing if no task with the given ID exists', () => {
    const wrapper = shallowMount(TaskBoard)

    wrapper.vm.tasks = [
      { id: 1, title: 'Original Title', description: 'Original Desc', status: 'todo' }
    ]

    const updatedTask = { id: 999, title: 'Should Not Update', description: 'No Change' }
    wrapper.vm.editTask(updatedTask)

    const task = wrapper.vm.tasks[0]
    expect(task.title).toBe('Original Title')
    expect(task.description).toBe('Original Desc')
  })

  it('returns only tasks with status "todo" in todoTasks', () => {
    const wrapper = shallowMount(TaskBoard)

    wrapper.vm.tasks = [
      { id: 1, status: 'todo' },
      { id: 2, status: 'inProgress' },
      { id: 3, status: 'done' }
    ]

    expect(wrapper.vm.todoTasks.length).toBe(1)
    expect(wrapper.vm.todoTasks[0].id).toBe(1)
  })

  it('returns only tasks with status "inProgress" in inProgressTasks', () => {
    const wrapper = shallowMount(TaskBoard)

    wrapper.vm.tasks = [
      { id: 1, status: 'todo' },
      { id: 2, status: 'inProgress' },
      { id: 3, status: 'done' }
    ]

    expect(wrapper.vm.inProgressTasks.length).toBe(1)
    expect(wrapper.vm.inProgressTasks[0].id).toBe(2)
  })

  it('returns only tasks with status "done" in doneTasks', () => {
    const wrapper = shallowMount(TaskBoard)

    wrapper.vm.tasks = [
      { id: 1, status: 'todo' },
      { id: 2, status: 'inProgress' },
      { id: 3, status: 'done' }
    ]

    expect(wrapper.vm.doneTasks.length).toBe(1)
    expect(wrapper.vm.doneTasks[0].id).toBe(3)
  })

})
