import { ElementWithAttributes, attributes, inject } from '@ski/mixins/mixins.js'
import { decorator } from './decorator.js'

type NotStringAttr = 'only string or boolean are allowed for attributes'

export const attr = decorator<string | boolean | undefined, NotStringAttr>(
  ({ prototype, propertyKey, descriptor }) => {
    const elementClass: ElementWithAttributes = <any>prototype.constructor
    if (!elementClass.defineAttribute) inject(prototype, attributes({}))
    return elementClass.defineAttribute(<string>propertyKey, descriptor)
  }
)
