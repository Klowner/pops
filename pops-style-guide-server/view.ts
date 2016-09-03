import * as Handlebars from 'handlebars'

export class View {
    private handlebars: any;

    constructor() {
        this.handlebars = Handlebars;
    }

    public registerPartial(namespace: string, name: string, content: string): void {
        let title: string = `${namespace}/${name}`
        
        this.handlebars.registerPartial(title, content)
    }

    public compile(source: string): HandlebarsTemplateDelegate {
        return this.handlebars.compile(source)
    }

    public render(source: string, context: any): string {
        let template: HandlebarsTemplateDelegate = this.compile(source)
        let html: string = template(context)

        return html
    }

    public addView(item): any {
        item.view = this.render(item.template, item.context)

        return item
    }

    public getViews(): any {
        return this.handlebars
    }
}