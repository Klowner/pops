import {readFileSync} from 'fs'

import {Config} from '../bin/config'
import {Twig} from './engines/twig'
import {Handlebars} from './engines/handlebars'

let config: any = new Config().getConfig()

export class View {
    private engine: any
    private templateExt: string

    constructor(ext: string = '') {
        this.templateExt = ext || config.ext.templates

        this.setEngine(this.templateExt)
    }

    private setEngine(engine: string): void {
        let engines: any = {
            'twig': () => {
                this.engine = new Twig()
            },
            'hbs': () => {
                this.engine = new Handlebars()
            },
            'default': () => {
                this.engine = new Handlebars()
            }
        }

        if (engines[engine]) {
            engines[engine]()
        } else {
            engines['default']()
        }
    }

    public preRenderPartials(): boolean {
        return this.engine.preRenderedPartials
    }

    public registerPartial(namespace: string, name: string, content: string): void {
        this.engine.registerPartial(namespace, name, content)
    }

    public addView(item): any {
        item.view = this.engine.renderViewAsText(item.template, item.context)

        return item
    }

    public asText(src: string, context: any): string {
        let content: string = readFileSync(src, 'utf8')

        return this.engine.renderViewAsText(content, context)
    }
}