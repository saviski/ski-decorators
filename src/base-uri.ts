import { ClassDecorator, decorator } from './decorator.js'
import { baseURI } from '@ski/mixins/mixins.js'

export const baseuri = decorator(
  class extends ClassDecorator<HTMLElement> {
    constructor(private uri: string) {
      super()
    }

    decorateClass({ constructor } = this.params) {
      return baseURI(this.uri)(constructor)
    }
  }
)
