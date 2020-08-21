import { decorator } from './decorator.js'

type NotElement = 'HTML Element type required'

export function element(query: string) {
  return decorator<Element | undefined, NotElement>(() => {
    return {
      get(this: Element) {
        return this.shadowRoot?.querySelector(query)
      },
    }
  })
}
