import { ClassDecorator } from './decorators/class-decorator.js'

class TagDecorator extends ClassDecorator<HTMLElement> {
  constructor(private tag: `${string}-${string}`) {
    super()
  }

  decorateClass({ constructor } = this.params) {
    customElements.define(this.tag, constructor)
  }
}

export const tag = TagDecorator.decorator()
