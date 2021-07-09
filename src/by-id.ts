import { PropertyDecorator } from './decorators/property-decorator.js'

/**
 * find element in element shadowroot by ID
 * HTML Element type required
 */

class ByIdDecorator extends PropertyDecorator<HTMLElement, string, Element | undefined> {
  decorateProperty({ property } = this.params) {
    return {
      get(this: Element) {
        return this.shadowRoot?.querySelector('#' + property.toString()) || undefined
      },
    }
  }
}

export const byId = ByIdDecorator.decorator()
