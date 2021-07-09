import { ClassDecorator } from './decorators/class-decorator.js'
import { baseURI } from '@ski/mixins/mixins.js'

class BaseURIDecorator extends ClassDecorator<HTMLElement> {
  constructor(private uri: string) {
    super()
  }

  decorateClass({ constructor } = this.params) {
    return baseURI(this.uri)(constructor)
  }
}

export const baseuri = BaseURIDecorator.decorator()
