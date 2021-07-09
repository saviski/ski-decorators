import { BaseDecorator } from './base-decorator.js'
import { ParameterParams } from './types.js'

export abstract class ParameterDecorator<T, K extends string | symbol = any> extends BaseDecorator {
  decorator<TT extends T = T, KK extends K = K>(prototype: TT, property: KK, parameterIndex: number): void {
    return this.decorateParameter({
      prototype,
      constructor: (<any>prototype).constructor,
      property,
      descriptor: Object.getOwnPropertyDescriptor(prototype, property),
      parameterIndex,
    })
  }

  params!: ParameterParams<T, K>

  abstract decorateParameter(params: ParameterParams<T, K>): void
}
