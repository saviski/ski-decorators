import { decorator, MethodDecorator, PropertyDecorator } from './decorator.js'
import { inject, InlineEventName, InlineEventListener, mixinEvents } from '@ski/mixins/mixins.js'

export const event = decorator(
  class extends PropertyDecorator<HTMLElement, InlineEventName, InlineEventListener<Event>> {
    decorateProperty({ constructor, property } = this.params) {
      inject(constructor, mixinEvents).defineEvent(property)
    }
  }
)

export const preventDefault = decorator(
  class extends MethodDecorator<HTMLElement, any, <E extends Event>(event: E) => any> {
    decorateMethod({ descriptor } = this.params) {
      return {
        value: function (event: Event) {
          event.preventDefault()
          return descriptor.value!.call(this, event)
        },
      }
    }
  }
)

export const stopPropagation = decorator(
  class extends MethodDecorator<HTMLElement, any, <E extends Event>(event: E) => any> {
    decorateMethod({ descriptor } = this.params) {
      return {
        value: function (event: Event) {
          event.stopPropagation()
          return descriptor.value!.call(this, event)
        },
      }
    }
  }
)

export const matches = decorator(
  class extends MethodDecorator<HTMLElement, any, <E extends Event>(event: E) => any> {
    constructor(private selectors: string) {
      super()
    }

    decorateMethod({ descriptor } = this.params) {
      let selectors = this.selectors
      return {
        value(this: Element, event: Event) {
          event.target instanceof Element && event.target.matches(selectors) && descriptor.value!.call(this, event)
        },
      }
    }
  }
)
