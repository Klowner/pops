import {join} from 'path'
import * as twig from 'twig'
import * as hbs from 'handlebars'

import {Config} from '../pops-commandline-client/config'

let config: any = require(new Config().getConfig())
let srcDir: string = config.src
let patternDir: string = join(srcDir, 'patterns/')
let componentDir: string = join(srcDir, 'components/')

interface ViewEngine {
    engine: any
    preRenderedPartials: boolean
    renderViewAsText(src: string, context: any): string
}

class Twig implements ViewEngine {
    engine: any = twig
    preRenderedPartials: boolean = false
    options: any = {
        data: '',
        namespaces: { 'patterns': patternDir, 'components': componentDir }
    }

    public renderViewAsText(src: string, context: any): string {
        this.options.data = src

        return this.engine.twig(this.options).render(context)
    }
}

class Handlebars implements ViewEngine {
    engine: any = hbs
    preRenderedPartials: boolean = true

    public registerPartial(namespace: string, name: string, content: string): void {
        let title: string = `${namespace}/${name}`

        this.engine.registerPartial(title, content)
    }

    private compile(source: string): HandlebarsTemplateDelegate {
        return this.engine.compile(source)
    }

    public renderViewAsText(src: string, context: any): string {
        let template: HandlebarsTemplateDelegate = this.compile(src)
        let html: string = template(context)

        return html
    }
}

export class View {
    private engine: any
    private templateExt: string

    constructor() {
        this.templateExt = config.ext.templates

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

    public addView(item): any {
        item.view = this.engine.renderViewAsText(item.template, item.context)

        return item
    }
}