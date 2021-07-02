import { inject, mixinCssProperties } from '@ski/mixins/mixins.js'
import { decorator, PropertyDecorator } from './decorator.js'

export const cssproperty = decorator(
  class extends PropertyDecorator<HTMLElement, string, string | undefined> {
    constructor(private syntax: string = '*') {
      super()
    }

    decorateProperty({ constructor, property, descriptor } = this.params) {
      inject(constructor, mixinCssProperties).defineCSSProperty(property, descriptor, this.syntax)
    }
  }
)

/**
 * string properties only
 */
export const cssp = cssproperty('*')
