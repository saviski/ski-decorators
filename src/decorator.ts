export type Constructor<T = any> = new (...args: any[]) => T

export interface DecoratorParams<T = unknown> {
  constructor: T extends Constructor ? T : never
  prototype: T extends Constructor ? never : object
  propertyKey: T extends Constructor ? never : string | symbol
  descriptor: T extends Constructor
    ? never
    : T extends Function
    ? TypedPropertyDescriptor<T>
    : TypedPropertyDescriptor<T> | undefined
  parameterIndex: number & never
}

type NotTypeError<T> = T extends string
  ? 'not string'
  : T extends number
  ? 'not number'
  : T extends object
  ? 'not object'
  : 'wrong type'

export type Decorator<U, V = 'wrong type'> = <T extends Object, K extends keyof T>(
  arg0: U extends Constructor ? U : T,
  arg1: (U extends Constructor ? void : never) | (T[K] extends U ? K : V),
  arg2?: TypedPropertyDescriptor<T[K]> // | number
) => T extends Constructor
  ? T | void
  : typeof arg2 extends PropertyDescriptor
  ? void | TypedPropertyDescriptor<T[K]>
  : void

/**
 * Generic decorator wrapper
 *
 * @example
 *
 * const method = decorator<(...args) => any>(<any>{})
 * const cls = decorator<Constructor>(<any>{})
 * const any = decorator<Constructor | Function | string>(<any>{})
 *
 * @param type U: allowed types for this decorator
 * <typeof ClassName> or <new (...args) => Type> for class decorators or
 * <(arg1: string, arg2: number)=>void> for method decorator
 * <string> for property decorator
 *
 * @cls
 * @any
 * class A {
 *  @cssprop @any a = ''
 *  @cssprop b = 50 //error wrong property type
 *  @cssprop @any set c(_a: string) {}
 *  @method @any xx() {}
 * }
 * @param decoratorFunction
 */
export const decorator = <U = any, V = NotTypeError<U>>(
  decoratorFunction: (d: DecoratorParams<U>) => any
): Decorator<U, V> => (
  arg0: object | Function,
  arg1: unknown,
  arg2?: PropertyDescriptor // | number
) => {
  const decoratorParams: DecoratorParams<any> = <any>{}
  typeof arg0 == 'function'
    ? (decoratorParams.constructor = arg0)
    : (decoratorParams.prototype = arg0)
  arg1 && (decoratorParams.propertyKey = <any>arg1)
  typeof arg2 == 'number'
    ? (decoratorParams.parameterIndex = arg2)
    : (decoratorParams.descriptor = <any>arg2)
  return decoratorFunction(decoratorParams)
}
