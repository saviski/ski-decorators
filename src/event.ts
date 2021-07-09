import { MethodDecorator } from './decorators/method-decorator.js'
import { PropertyDecorator } from './decorators/property-decorator.js'
import { inject, InlineEventName, InlineEventListener, mixinEvents } from '@ski/mixins/mixins.js'

class EventDecorator extends PropertyDecorator<HTMLElement, InlineEventName, InlineEventListener<Event>> {
  decorateProperty({ constructor, property } = this.params) {
    inject(constructor, mixinEvents).defineEvent(property)
  }
}

type AnyEventListener = <E extends Event>(event: E) => any

type MethodIsListener<T, K extends keyof T> = T[K] extends (event: infer E) => any
  ? E extends Event
    ? T[K]
    : AnyEventListener
  : AnyEventListener

abstract class EventListenerDecorator extends MethodDecorator<HTMLElement, any, any> {
  override decorator!: <T extends HTMLElement, K extends keyof T>(
    prototype: T,
    property: K,
    descriptor: TypedPropertyDescriptor<MethodIsListener<T, K>>
  ) => void
}
class PreventDefaultDecorator extends EventListenerDecorator {
  decorateMethod({ descriptor } = this.paramtypes) {
    return {
      value(event: Event) {
        event.preventDefault()
        return descriptor.value!.call(this, event)
      },
    }
  }
}

class StopPropagationDecorator extends EventListenerDecorator {
  decorateMethod({ descriptor } = this.paramtypes) {
    return {
      value(event: Event) {
        event.stopPropagation()
        return descriptor.value!.call(this, event)
      },
    }
  }
}

class MatchesDecorator extends EventListenerDecorator {
  constructor(private selectors: string) {
    super()
  }

  decorateMethod({ descriptor } = this.paramtypes) {
    let selectors = this.selectors
    return {
      value(this: Element, event: Event) {
        event.target instanceof Element && event.target.matches(selectors) && descriptor.value!.call(this, event)
      },
    }
  }
}

export const event = EventDecorator.decorator()
export const preventDefault = PreventDefaultDecorator.decorator()
export const stopPropagation = StopPropagationDecorator.decorator()
export const matches = MatchesDecorator.decorator()
