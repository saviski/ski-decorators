export interface ClassParams<T> {
  constructor: T extends new (...args: any) => any ? T : new (...args: any) => T
  prototype: T extends new (...args: any) => any ? InstanceType<T> : T
}

export interface PropertyParams<T, U, V> extends ClassParams<T> {
  property: U
  descriptor?: TypedPropertyDescriptor<V>
}

export interface MethodParams<T, U, V> extends PropertyParams<T, U, V> {
  descriptor: TypedPropertyDescriptor<V>
}

export interface ParameterParams<T, U> extends PropertyParams<T, U, any> {
  parameterIndex: number
}

export abstract class BaseDecorator {
  constructor() {
    const decorator = (...args: [any, any, any]) => this.decorate(...args)
    return Object.setPrototypeOf(decorator, this)
  }

  abstract decorate(target: any, property?: string | symbol, extra?: PropertyDescriptor | number)
}

export interface BaseDecorator {
  protected(...args: [any, any, any]): any
}

Object.setPrototypeOf(BaseDecorator.prototype, Function.prototype)
Object.setPrototypeOf(BaseDecorator, Function)

export abstract class PropertyDecorator<T, U, V> extends BaseDecorator {
  decorate(prototype, property, descriptor) {
    let result = this.decorateProperty({
      prototype,
      constructor: prototype.constructor,
      property,
      descriptor,
    })
    if (result) Object.defineProperty(prototype, property, { ...result, configurable: true, enumerable: true })
  }

  params!: PropertyParams<T, U, V>

  abstract decorateProperty(params: PropertyParams<T, U, V>): TypedPropertyDescriptor<V> | void
}

export interface PropertyDecorator<T = any, U = string | symbol, V = any> {
  (prototype: T, property: U, descriptor?: TypedPropertyDescriptor<V>): void
}

export abstract class MethodDecorator<T, U, V> extends PropertyDecorator<T, U, V> {
  decorateProperty(params: MethodParams<T, U, V>) {
    return this.decorateMethod(params)
  }

  params!: MethodParams<T, U, V>

  abstract decorateMethod(params: MethodParams<T, U, V>): TypedPropertyDescriptor<V> | void
}

export abstract class ParameterDecorator<T, U> extends BaseDecorator {
  decorate(prototype, property, parameterIndex) {
    this.decorateParameter({
      prototype,
      constructor: prototype.constructor,
      property,
      descriptor: Object.getOwnPropertyDescriptor(prototype, property),
      parameterIndex,
    })
  }

  params!: ParameterParams<T, U>

  abstract decorateParameter(params: ParameterParams<T, U>): void
}

export interface ParameterDecorator<T = any, U = string | symbol> {
  (prototype: T, property: U, parameterIndex: number): void
}

export abstract class ClassDecorator<T> extends BaseDecorator {
  decorate(prototype) {
    this.decorateClass({
      prototype,
      constructor: prototype.constructor,
    })
  }

  params!: ClassParams<T>

  abstract decorateClass(params: ClassParams<T>): (new (...args: any) => T) | void
}

export interface ClassDecorator<T = any> {
  (constructor: new (...args: any) => T): void
}

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

export interface GenericDecorator<T = any, U = string | symbol, V = any> {
  (prototype: T, property?: U, descriptor?: TypedPropertyDescriptor<V> | number): any
}

export function decorator<T extends new (...args: any) => BaseDecorator>(
  constructor: T
): ConstructorParameters<T> extends [] ? InstanceType<T> : (...args: ConstructorParameters<T>) => InstanceType<T> {
  return <any>(constructor.length == 0 ? new constructor() : (...args: any[]) => new constructor(...args))
}
