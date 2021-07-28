import { PropertyDecorator } from './decorators/property-decorator.js'
import { mixinElements, inject } from '@ski/mixins/mixins.js'

/**
 * HTML Element type required
 */

class ElementDecorator extends PropertyDecorator<HTMLElement, string, Element | undefined> {
  constructor(private query: string) {
    super()
  }

  decorateProperty({ constructor, property } = this.params) {
    inject(constructor, mixinElements).defineElement(property, this.query)
  }
}

export const element = ElementDecorator.decorator()
