import { decorator } from './decorator.js'

export const prop = decorator<(value: any) => void>(({ propertyKey, descriptor }) => {
  return <PropertyDescriptor>{
    get() {
      return this['#' + propertyKey.toString()]
    },

    set(value) {
      this['#' + propertyKey.toString()] = value
      descriptor.set?.call(this, value)
    },
  }
})
