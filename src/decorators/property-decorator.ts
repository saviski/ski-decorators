import { BaseDecorator } from './base-decorator.js'
import { PropertyParams } from './types.js'

export abstract class PropertyDecorator<T, K extends string | symbol, V> extends BaseDecorator {
  //
  decorator(prototype: T, property: K, descriptor?: TypedPropertyDescriptor<V>) {
    let result = this.decorateProperty({
      prototype,
      constructor: (<any>prototype).constructor,
      property,
      descriptor,
    })
    if (result) Object.defineProperty(prototype, property, { ...result, configurable: true, enumerable: true })
  }

  params!: PropertyParams<T, K, V>

  abstract decorateProperty(params: PropertyParams<T, K, V>): TypedPropertyDescriptor<V> | void
}
