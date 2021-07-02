import { decorator, PropertyDecorator } from './decorator.js'

/**
 * find element in element shadowroot by ID
 * HTML Element type required
 */

export const byId = decorator(
  class extends PropertyDecorator<HTMLElement, string, Element | undefined> {
    decorateProperty({ property } = this.params) {
      return {
        get(this: Element) {
          return this.shadowRoot?.querySelector('#' + property.toString()) || undefined
        },
      }
    }
  }
)
