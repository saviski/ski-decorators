import { BaseDecorator } from './base-decorator.js'
import { ClassParams, PropertyParams, MethodParams, ParameterParams } from './types.js'

export abstract class GenericDecorator<T, U, V> extends BaseDecorator {
  abstract decorateClass(params: ClassParams<T>)
  classParams!: ClassParams<T>

  abstract decorateParameter(params: ParameterParams<T, U>)
  parameterParams!: ParameterParams<T, U>

  abstract decorateMethod(params: MethodParams<T, U, V>)
  methodParams!: MethodParams<T, U, V>

  abstract decorateProperty(params: PropertyParams<T, U, V>)
  propertyParams!: PropertyParams<T, U, V>

  decorate(target: any, property?: any, extra?: PropertyDescriptor | number) {
    switch ([typeof target, typeof property, typeof extra].toString()) {
      case 'function,undefined,undefined':
        this.decorateClass({ prototype: target.prototype, constructor: target })
        break
      case 'object,string,number':
      case 'object,symbol,number':
        this.decorateParameter({
          prototype: target,
          constructor: target.constructor,
          property,
          descriptor: <any>Object.getOwnPropertyDescriptor(target, property),
          parameterIndex: <number>extra,
        })
        break
      case 'object,string,object':
      case 'object,symbol,object':
        this.decorateMethod({
          prototype: target,
          constructor: target.constructor,
          property,
          descriptor: <any>extra,
        })
        break
      case 'object,string,undefined':
      case 'object,symbol,undefined':
        this.decorateProperty({
          prototype: target,
          constructor: target.constructor,
          property,
          descriptor: <any>(extra || Object.getOwnPropertyDescriptor(target, property!)),
        })
        break
    }
  }
}
