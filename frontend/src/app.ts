import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import MainComponent from './Main.vue'
import createStore, { State } from './store'
import { PDRApplication } from './types'
import VueElements from '@stratsys/pdr/lib/VueElements'

interface Attributes {
  [key: string]: string
}

// This is the entrypoint for your application.
// This file is lazy loaded by the custom element so you can use regular import statements
// Make sure all your dependencies like polyfills or librabry code is included here.
const main = ($element: HTMLElement, attributes: Attributes): Application => {
  return new Application($element, attributes)
}
class Application implements PDRApplication {
  private store: Store<State>
  private vueInstance: Vue

  public constructor($element: HTMLElement, attributes: Attributes) {
    // The constructor is called from the main function. That is called after
    // the custom element is attached to the DOM. Your app initilization code can be placed here.
    // Including things that require the DOM.
    // Arguments can be passed to the custom element trought attributes.
    // You can access them though $element.getAttribute('attribute-name');
    Vue.config.productionTip = false
    Vue.config.ignoredElements = [/^pdr-.*?/i, /^layout-.*?/i, /^stratsys-.*?/i]
    Vue.use(VueElements)
    Vue.use(Vuex)
    const options = this.filterAttributes(attributes)
    this.store = createStore(options)
    this.vueInstance = new Vue({
      store: this.store,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (h: any): any => h(MainComponent)
    }).$mount($element)
  }

  public update(attribute: string, value: string): void {
    // This method is called after the attributes of the custom element have been updated.
    this.store.commit('option-updated', {
      attribute,
      value
    })
  }

  public destroy(): void {
    // Do all the clean up you need here, this method is called after the custom element is detached.
    // Things includes things like removing DOM-elements you have created and removing event listeners.
    this.vueInstance.$destroy()
  }

  private filterAttributes(attributes: Attributes): Attributes {
    // TODO: Replace this with any options you might have
    return {
      message: attributes['message']
    }
  }
}

export { main }
