import { inject, mixinCssProperties } from '@ski/mixins/mixins.js'
import { PropertyDecorator } from './decorators/property-decorator.js'

class CssPropertyDecorator extends PropertyDecorator<HTMLElement, string, string | undefined> {
  constructor(private syntax: string) {
    super()
  }

  decorateProperty({ constructor, property, descriptor } = this.params) {
    inject(constructor, mixinCssProperties).defineCSSProperty(property, descriptor, this.syntax)
  }
}

export const cssproperty = CssPropertyDecorator.decorator()

/**
 * string properties only
 */
export const cssp = cssproperty('*')
