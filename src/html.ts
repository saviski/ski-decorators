import { htmlContent } from '@ski/mixins/mixins.js'
import { ClassDecorator, decorator } from './decorator.js'

export const html = decorator(
  class extends ClassDecorator<HTMLElement> {
    //
    mixin: (superclass: CustomElementConstructor) => CustomElementConstructor

    constructor(template: TemplateStringsArray, ...substitutions: any[]) {
      super()
      this.mixin = htmlContent(String.raw(template, ...substitutions))
    }

    decorateClass({ constructor } = this.params) {
      return this.mixin(constructor)
    }
  }
)
