import { decorator } from './decorator'
import { baseURI } from '@ski/mixins'

export function baseuri(uri: string) {
  return decorator<CustomElementConstructor>(({ constructor }) =>
    baseURI(uri)(constructor)
  )
}
