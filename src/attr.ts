import { inject, mixinAttributes } from '@ski/mixins/mixins.js'
import { decorator, PropertyDecorator } from './decorator.js'

/**
 * only string or boolean types are allowed for attributes
 */
export const attr = decorator(
  class extends PropertyDecorator<HTMLElement, string, string | boolean | undefined> {
    decorateProperty({ constructor, property, descriptor } = this.params) {
      inject(constructor, mixinAttributes).defineAttribute(property, descriptor)
    }
  }
)
