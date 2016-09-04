import {join} from 'path'
import {readFileSync} from 'fs'

import {Config} from '../pops-commandline-client/config'
import {Twig} from './engines/twig'
import {Handlebars} from './engines/handlebars'

let config: any = require(new Config().getConfig())

export class View {
    private engine: any
    private templateExt: string

    constructor(ext: string = '') {
        this.templateExt = ext || config.ext.templates

        switch (this.templateExt) {
            case 'twig':
                this.engine = new Twig()
                break
            case 'hbs':
                this.engine = new Handlebars()
                break
            default:
                this.engine = new Handlebars()
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
        let content = readFileSync(src, 'utf8')
        let view: string = this.engine.renderViewAsText(content, context)

        return view
    }
}