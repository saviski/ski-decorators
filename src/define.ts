import { decorator } from './decorator.js'

export function define(name: string) {
  return decorator<CustomElementConstructor>(({ constructor }) => {
    customElements.define(name, constructor)
  })
}
