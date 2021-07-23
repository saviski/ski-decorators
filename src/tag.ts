import { LazyClassDecorator } from './decorators/class-decorator.js'

class TagDecorator extends LazyClassDecorator<HTMLElement> {
  constructor(private tag: `${string}-${string}`) {
    super()
  }

  decorateFinalizedClass({ constructor } = this.params) {
    customElements.define(this.tag, constructor)
  }
}

export const tag = TagDecorator.decorator()
