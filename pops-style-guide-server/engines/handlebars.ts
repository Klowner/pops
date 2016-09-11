import * as hbs from 'handlebars'

import {ViewEngine} from './ViewEngine'

export class Handlebars implements ViewEngine {
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

        return template(context)
    }
}
