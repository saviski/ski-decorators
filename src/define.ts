import { decorator } from './decorator'

export function define(name: string) {
  return decorator<CustomElementConstructor>(({ constructor }) => {
    customElements.define(name, constructor)
  })
}
