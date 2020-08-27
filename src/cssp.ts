import { inject, cssProperties, CSSObservers } from '@ski/mixins/mixins.js'
import { decorator } from './decorator.js'

function cssPropertyDecorator({
  prototype = <object>{},
  propertyKey = <string | symbol>'',
  descriptor = <TypedPropertyDescriptor<string>>{},
  syntax = '*',
}) {
  const elementClass: CSSObservers = <any>prototype.constructor
  if (!elementClass.defineCSSProperty) inject(prototype, cssProperties({}))
  return elementClass.defineCSSProperty(<string>propertyKey, descriptor, syntax)
}

type NotStringMessage = 'string type required'

export const cssp = decorator<string, NotStringMessage>(cssPropertyDecorator)

export function cssproperty(syntax: string) {
  return decorator<string, NotStringMessage>(params =>
    cssPropertyDecorator({
      ...params,
      syntax,
    })
  )
}
