import { shallowMount, createLocalVue } from '@vue/test-utils'
import Main from '@/Main.vue'
import Vuex, { Store } from 'vuex'
import { State } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Main', () => {
  const message = 'Test Message'
  let store: Store<State>
  beforeAll(() => {
    store = new Vuex.Store({
      state: {
        options: {
          message
        }
      } as State
    })
  })

  it('should contain the message', () => {
    const wrapper = shallowMount(Main, { store, localVue })
    const header = wrapper.element.querySelector('h1') as HTMLHeadingElement
    expect(header!.innerHTML).toMatch(message)
  })
})
