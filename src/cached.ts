import { decorator, MethodDecorator } from './decorator.js'

export const cached = decorator(
  class extends MethodDecorator<any, string | symbol, any> {
    decorateMethod({ property, descriptor } = this.params) {
      return {
        get() {
          let value = descriptor.get!()
          Object.defineProperty(this, property, { value, configurable: true, enumerable: true })
          return value
        },
      }
    }
  }
)
