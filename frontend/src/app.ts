import { PDRApplication } from './types'
import HelloWorld from './presentation/HelloWorld'

interface Attributes {
  [key: string]: string
}

// This is the entrypoint for your application.
// This file is lazy loaded by the custom element so you can use regular import statements
// Make sure all your dependencies like polyfills or librabry code is included here.
const main = ($element: HTMLElement, attributes: Attributes): Application => {
  return new Application($element, attributes)
}
export { main }

class Application implements PDRApplication {
  private helloWorld: HelloWorld

  public constructor($element: HTMLElement, attributes: Attributes) {
    // The constructor is called from the main function. That is called after
    // the custom element is attached to the DOM. Your app initilization code can be placed here.
    // Including things that require the DOM.
    // Arguments can be passed to the custom element trought attributes.
    const message = attributes['message']
    const actionText = attributes['action-text']
    this.helloWorld = new HelloWorld(message, actionText)
    this.helloWorld.attach($element)
  }

  public update(attribute: string, value: string): void {
    // This method is called after the attributes of the custom element have been updated.
    if (attribute === 'message') {
      this.helloWorld.updateHeading(value)
    } else {
      console.log(`The attribute "${attribute}" was updated, the new value is "${value}"`)
    }
  }

  public destroy(): void {
    // Do all the clean up you need here, this method is called after the custom element is detached.
    // Things includes things like removing DOM-elements you have created and removing event listeners.
    this.helloWorld.removeEventListeners()
  }
}
