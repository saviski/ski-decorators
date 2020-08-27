import { html as htmlMixin } from '@ski/mixins/mixins.js'

export function html(template: TemplateStringsArray, ...substitutions: any[]) {
  return htmlMixin(String.raw(template, ...substitutions))
}
