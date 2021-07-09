import { inject, mixinAttributes } from '@ski/mixins/mixins.js'
import { PropertyDecorator } from './decorators/property-decorator.js'

/**
 * only string or boolean types are allowed for attributes
 */
class AttrDecorator extends PropertyDecorator<HTMLElement, string, string | boolean | undefined> {
  decorateProperty({ constructor, property, descriptor } = this.params) {
    inject(constructor, mixinAttributes).defineAttribute(property, descriptor)
  }
}

export const attr = AttrDecorator.decorator()
