import { MethodDecorator } from './decorators/method-decorator.js'

/**
 * turns a function into a getter and setter that stores the value
 *
 * class A {
 *  @prop name(value: any): void { console.log('name changed', value) }
 * }
 *
 * let a = new A();
 * a.name = 'test' // logs 'name changed', 'test'
 *
 * a.name // returns 'test'
 */

class PropDecorator extends MethodDecorator<any, string, (value: any) => void> {
  override decorateMethod({ descriptor } = this.params): PropertyDescriptor {
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

export const prop = PropDecorator.decorator()
