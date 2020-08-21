Decorators

```typescript
import { attr } from '@ski/decorators'

class CustomElement extends HTMLElement {
  @attr width = '300'
}
```

Generic decorator wrapper

| decorator<allowed_types, 'error message'>

```typescript

  import { decorator } from '@ski/decorators'

  const method = decorator<(...args) => any>(<any>{})
  const cls = decorator<Constructor>(<any>{})
  const any = decorator<Constructor | Function | string>(<any>{})

  // <typeof ClassName> or <new (...args) => Type> for class decorators or
  <(arg1: string, arg2: number)=>void> for method decorator
  <string> for property decorator

  @cls
  @any
  class A {
   @cssprop @any a = ''
   @cssprop b = 50 //error wrong property type
   @cssprop @any set c(_a: string) {}
   @method @any xx() {}
  }
```
