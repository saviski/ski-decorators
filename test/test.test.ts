import { suite, test } from './lib/testdeck.esm.js'
import 'chai/register-should.js'
// import { expect } from 'chai'

@suite
export class Test {
  //
  @test async ' abc'() {}
}
