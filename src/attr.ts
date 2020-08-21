import { ElementWithAttributes, attributes, inject } from '@ski/mixins'
import { decorator } from './decorator.js'

type NotStringAttr = 'only string type is allowed for attributes'

export const attr = decorator<string, NotStringAttr>(
  ({ prototype, propertyKey, descriptor }) => {
    const elementClass: ElementWithAttributes = <any>prototype.constructor
    if (!elementClass.defineAttribute) inject(prototype, attributes({}))
    return elementClass.defineAttribute(<string>propertyKey, descriptor)
  }
)
