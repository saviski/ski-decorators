import { decorator, MethodDecorator } from './decorator.js'

/**
 * creates a getter and a setter for a setter method that stores a value
 */
export const prop = decorator(
  class extends MethodDecorator<any, string, (value: any) => void> {
    decorateMethod({ descriptor } = this.params): PropertyDescriptor {
      let store = new WeakMap<any, any>()
      return {
        get() {
          return store.get(this)
        },

        set(value) {
          store.set(this, value)
          descriptor.set?.call(this, value)
        },
      }
    }
  }
)
