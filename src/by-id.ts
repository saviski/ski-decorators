import { decorator } from './decorator.js'

type NotElement = 'HTML Element type required'

/**
 * find element in element shadowroot by ID
 */
export const byId = decorator<Element | undefined, NotElement>(({ propertyKey }) => {
  return {
    get(this: Element) {
      return this.shadowRoot?.querySelector('#' + propertyKey.toString())
    },
  }
})
