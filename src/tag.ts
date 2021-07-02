import { ClassDecorator, decorator } from './decorator.js'

export const tag = decorator(
  class extends ClassDecorator<HTMLElement> {
    constructor(private tag: `${string}-${string}`) {
      super()
    }

    decorateClass({ constructor } = this.params) {
      customElements.define(this.tag, constructor)
    }
  }
)
