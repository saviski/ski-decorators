import { decorator } from './decorator.js'

export const cached = decorator<() => any>(({ propertyKey, descriptor }) => {
  return {
    get() {
      const value = descriptor.get!()

      Object.defineProperty(this, propertyKey, {
        get: () => value,
        configurable: true,
        enumerable: descriptor.enumerable,
      })
    },
  }
})
