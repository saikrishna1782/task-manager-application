import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TaskForm)
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Task title"]').exists()).toBe(true)
    expect(wrapper.find('textarea[placeholder="Task description"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('validates empty form submission', async () => {
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('.error-text').text()).toBe('Title is required')
    expect(wrapper.findAll('.error-text').length).toBe(2)
  })

  it('emits add-task event with valid data', async () => {
    const title = 'Test Task'
    const description = 'Test Description'

    await wrapper.find('input').setValue(title)
    await wrapper.find('textarea').setValue(description)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')[0][0]).toEqual({
      title,
      description
    })
  })

  it('clears form after successful submission', async () => {
    const title = 'Test Task'
    const description = 'Test Description'

    await wrapper.find('input').setValue(title)
    await wrapper.find('textarea').setValue(description)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.title).toBe('')
    expect(wrapper.vm.description).toBe('')
  })
})