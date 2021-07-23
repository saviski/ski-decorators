import { BaseDecorator } from './base-decorator.js'
import { ClassParams } from './types.js'

const classmap = new WeakMap<new (...args: any) => any, new (...args: any) => any>()

export abstract class ClassDecorator<T> extends BaseDecorator {
  override decorator<U extends new (...args: any) => T>(constructor: U): U | void {
    let result = this.decorateClass({
      constructor,
      prototype: constructor.prototype,
    }) as U

    if (result && result !== constructor) classmap.set(constructor, result)
    return result
  }

  params!: ClassParams<T>

  abstract decorateClass(params: ClassParams<T>): (new (...args: any) => T) | void
}

/**
 * awaits for other decorators that may alter the constructor
 * can't return a new constructor
 *
 * assuming
 *
 * let decoratorA: <T, U>(c: T): U
 * let decoratorB: <T, U>(c: T): U
 * let decoratorC: <U>(c: U): U
 *
 * @decoratorA
 * @decoratorC // <-- lazy decorator
 * @decoratorB
 * class ABC {}
 *
 * decoratorC will wait for decoratorA and decoratorB to be applied before executing
 * it can be used when you need the final class definition
 * but do not want to require the decorator to be placed first
 *
 */
export abstract class LazyClassDecorator<T> extends ClassDecorator<T> {
  override decorateClass(params: ClassParams<T>): void {
    setTimeout(
      () =>
        this.decorateFinalizedClass({
          ...params,
          constructor: this.getFinalConstructor(params.constructor),
        }),
      1
    )
  }

  private getFinalConstructor(constructor: new (...args: any) => any) {
    while (classmap.has(constructor)) constructor = classmap.get(constructor)!
    return constructor
  }

  abstract decorateFinalizedClass(params: ClassParams<T>): void
}
