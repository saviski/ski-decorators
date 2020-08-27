import { decorator } from './decorator.js'
import { baseURI } from '@ski/mixins/mixins.js'

export function baseuri(uri: string) {
  return decorator<CustomElementConstructor>(({ constructor }) =>
    baseURI(uri)(constructor)
  )
}
