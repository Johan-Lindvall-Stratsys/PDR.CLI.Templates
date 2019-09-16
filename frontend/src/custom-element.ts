/* eslint-disable no-undef */
import { PDRCustomElement } from './types'

const customElement = document.registerElement('##TAG_NAME##', {
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value(): void {
        onCreate(this)
      }
    },
    attachedCallback: {
      value(): void {
        onAttach(this)
      }
    },
    detachedCallback: {
      value(): void {
        onDetach(this)
      }
    },
    attributeChangedCallback: {
      value(name: string, oldValue: string, newValue: string): void {
        onAttributeChange(this, name, oldValue, newValue)
      }
    },
    // Everyone that can access an instance of the element can read it's version
    getVersion: {
      value(): string {
        // In every file built by webpack/rollup you can use the global variable VERSION to get the version number
        return VERSION
      }
    }
    // You can add your own methods and properties here.
    // They are available on an instance of ##ELEMENT_CLASS##
  })
})

function onCreate(element: PDRCustomElement): void {
  // Everything that has to run when an element is created but before it attaches to the DOM belongs here.
  element._import = Promise.all([
    import('./app')
    // You can require other resources that should not be part of the frontend bundle here.
  ])
  element.style.display = 'block'
}

async function onAttach(element: PDRCustomElement): Promise<void> {
  // Things that need to run after the element has been attached to the DOM belong here.
  const status = { attached: true }
  element._status = status
  const [
    application
    // Other resources that are lazy loaded in onCreate can be accessed here.
  ] = await element._import
  if (status.attached) {
    element._root = document.createElement('div')
    element.appendChild(element._root)
    const attributes = Array.from(element.attributes).reduce(
      (acc: { [key: string]: string }, a: Attr): { [key: string]: string } => {
        acc[a.name] = a.value
        return acc
      },
      {}
    )
    // This is the main contact point for the custom tag and the rest of the frontend package.
    // You can pass additional resources through the main function.
    element._app = application.main(element._root, attributes)
  }
}

function onDetach(element: PDRCustomElement): void {
  // All cleanup belongs here.
  if (element._status) {
    element._status.attached = false
    delete element._status
  }

  if (element._app) {
    element._app.destroy()
    delete element._app
  }

  if (element._root) {
    if (element._root.remove) {
      element._root.remove()
    } else if (element._root.parentNode) {
      element._root.parentNode.removeChild(element._root)
    }
    delete element._root
  }
}

function onAttributeChange(
  element: PDRCustomElement,
  name: string,
  oldValue: string,
  newValue: string
): void {
  // Attribute changes are handled here.
  if (element._app) {
    element._app.update(name, newValue)
  }
}

window['##ELEMENT_CLASS##'] = customElement
export default customElement
