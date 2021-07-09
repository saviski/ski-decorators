import { BaseDecorator } from './base-decorator.js'
import { ClassParams } from './types.js'

export abstract class ClassDecorator<T> extends BaseDecorator {
  decorator<TT extends T = T>(constructor: new (...args: any) => TT): (new (...args: any) => T) | void {
    return this.decorateClass({
      constructor,
      prototype: constructor.prototype,
    })
  }

  params!: ClassParams<T>

  abstract decorateClass(params: ClassParams<T>): (new (...args: any) => T) | void
}
