export interface ClassParams<T> {
  constructor: new (...args: any) => T
  prototype: T
}

export interface PropertyParams<T, U, V> extends ClassParams<T> {
  property: U
  descriptor?: TypedPropertyDescriptor<V>
}

export interface MethodParams<T, U, V> extends ClassParams<T> {
  property: U
  descriptor: TypedPropertyDescriptor<V>
}

export interface ParameterParams<T, U> extends PropertyParams<T, U, any> {
  parameterIndex: number
}
