export const popsConfigTemplate: Function = (): string => `
module.exports = {
  src: 'styleguide',
  ext: {
    styles: 'scss',
    templates: 'html',
    scripts: 'js'
  }
}
`