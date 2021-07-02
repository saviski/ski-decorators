import { decorator, PropertyDecorator } from './decorator.js'

/**
 * HTML Element type required
 */

export const element = decorator(
  class extends PropertyDecorator<HTMLElement, string, Element | undefined> {
    constructor(private query: string) {
      super()
    }

    decorateProperty() {
      let query = this.query
      return {
        get(this: Element) {
          return this.shadowRoot?.querySelector(query) || undefined
        },
      }
    }
  }
)
