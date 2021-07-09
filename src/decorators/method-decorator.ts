import { BaseDecorator } from './base-decorator.js'
import { MethodParams } from './types.js'

export abstract class MethodDecorator<T, K extends string | symbol, V> extends BaseDecorator {
  //
  decorator(prototype: T, property: K, descriptor: TypedPropertyDescriptor<V>): void

  decorator(prototype: any, property: any, descriptor: PropertyDescriptor) {
    let result = this.decorateMethod({
      prototype,
      constructor: prototype.constructor,
      property,
      descriptor: descriptor,
    })
    if (result)
      Object.defineProperty(prototype, property, {
        ...result,
        configurable: true,
        enumerable: true,
      })
  }

  paramtypes!: MethodParams<T, K, V>

  abstract decorateMethod(params: MethodParams<T, K, V>): TypedPropertyDescriptor<V> | void
}
