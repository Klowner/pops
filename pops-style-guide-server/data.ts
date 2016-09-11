import {View} from './view'
import {PageStore, PatternStore, OverviewStore, ComponentStore} from './stores'
import {PageStruct, PatternStruct, OverviewStruct, ComponentStruct} from './structs'

export class Data {
    private view: View

    constructor(ext: string = '') {
        this.view = new View(ext)
    }

    public pages(src: string): PageStruct[] {
        let store: PageStore = new PageStore(src)
        let pages: PageStruct[] = store.all()

        return pages.map((page) => this.view.addView(page))
    }

    public patterns(src: string): PatternStruct[] {
        let store: PatternStore = new PatternStore(src)
        let patterns: PatternStruct[] = store.all()

        if (this.view.preRenderPartials()) {
            patterns = patterns
                .map((pattern) => {
                    this.view.registerPartial('pattern', pattern.name, pattern.template)

                    return pattern
                })
        }

        return patterns.map((pattern) => this.view.addView(pattern))
    }

    public overviews(src: string): OverviewStruct[] {
        let store: OverviewStore = new OverviewStore(src)

        return store.all()
    }

    public components(src: string): ComponentStruct[] {
        let store: ComponentStore = new ComponentStore(src)
        let components: ComponentStruct[] = store.all()

        if (this.view.preRenderPartials()) {
            components = components
                .map((component) => {
                    this.view.registerPartial('component', component.name, component.template)

                    return component
                })
        }

        return components.map((component) => this.view.addView(component))
    }

    public all(src: string): any {
        let patterns = this.patterns(src)
        let components = this.components(src)
        let pages = this.pages(src)
        let overviews = this.overviews(src)

        return {overviews, components, patterns, pages}
    }
}