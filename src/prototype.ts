import { decorator } from './decorator.js'

export const prototype = (value: any) =>
  decorator<unknown>(({ prototype, propertyKey }) => {
    Object.defineProperty(prototype, propertyKey, {
      value,
      configurable: true,
      enumerable: true,
    })
  })
