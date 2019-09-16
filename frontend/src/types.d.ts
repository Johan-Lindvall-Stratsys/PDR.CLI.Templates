/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PDRCustomElement extends HTMLElement {
  _import: Promise<any>
  _app: PDRApplication
  _status: {
    attached: boolean
  }
}

export interface PDRApplication {
  update(attribute: string, value: string): void
  destroy(): void
}

declare global {
  interface Document {
    registerElement(name: string, config: any): void
  }

  interface Window {
    [key: string]: any
  }

  const VERSION: string
}
