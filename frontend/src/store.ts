import Vue from 'vue'
import Vuex, { Store } from 'vuex'

interface Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface State {
  options: Options
}

export default function createStore(options: Options): Store<State> {
  return new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: {
      options: Object.freeze(options)
    },
    actions: {
      // TODO: Add actions
    },
    mutations: {
      // TODO: Add mutations
      ['option-updated'](state: State, payload: { attribute: string; value: string }): void {
        const options = {
          ...state.options,
          [payload.attribute]: payload.value
        }
        Vue.set(state, 'options', Object.freeze(options))
      }
    },
    getters: {
      // TODO: Add getters
    }
  })
}
