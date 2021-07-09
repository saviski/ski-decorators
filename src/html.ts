import { htmlContent } from '@ski/mixins/mixins.js'
import { ClassDecorator } from './decorators/class-decorator.js'

class HTMLDecorator extends ClassDecorator<HTMLElement> {
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

export const html = HTMLDecorator.decorator()
