interface Decorator {
  decorator(target: any, property?: any, extra?: any): any
}

export abstract class BaseDecorator implements Decorator {
  abstract decorator(target: any, property?: string | symbol, extra?: PropertyDescriptor | number)

  typed<T, K, V>() {
    return (prototype: T, property: K, extra: TypedPropertyDescriptor<V>) =>
      this.decorator(prototype, <any>property, extra)
  }

  bind() {
    return this.decorator.bind(this)
  }

  static decorator<T extends Decorator>(this: abstract new () => T): T['decorator']

  static decorator<T extends abstract new (a: any, ...args: any[]) => Decorator>(
    this: T
  ): T extends new (...args: infer A) => Decorator ? (...args: A) => InstanceType<T>['decorator'] : never

  static decorator(this: new (...args: any) => BaseDecorator) {
    return this.length == 0 ? new this().bind() : (...args: any[]) => new this(...args).bind()
  }
}
