import { PropertyDecorator } from './decorators/property-decorator.js'

/**
 * HTML Element type required
 */

class ElementDecorator extends PropertyDecorator<HTMLElement, string, Element | undefined> {
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

export const element = ElementDecorator.decorator()
