import { MethodDecorator } from './decorators/method-decorator.js'

class CachedDecorator extends MethodDecorator<any, string | symbol, any> {
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

export const cached = CachedDecorator.decorator()
