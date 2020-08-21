import { html as htmlMixin } from '@ski/mixins'

export function html(template: TemplateStringsArray, ...substitutions: any[]) {
  return htmlMixin(String.raw(template, ...substitutions))
}
