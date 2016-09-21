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

        return pages.map((page: PageStruct) => this.view.addView(page))
    }

    public patterns(src: string): PatternStruct[] {
        let store: PatternStore = new PatternStore(src)
        let patterns: PatternStruct[] = store.all()

        if (this.view.preRenderPartials()) {
            patterns = patterns
                .map((pattern: PatternStruct) => {
                    this.view.registerPartial('pattern', pattern.name, pattern.template)

                    return pattern
                })
        }

        return patterns.map((pattern: PatternStruct) => this.view.addView(pattern))
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
                .map((component: ComponentStruct) => {
                    this.view.registerPartial('component', component.name, component.template)

                    return component
                })
        }

        return components.map((component: ComponentStruct) => this.view.addView(component))
    }

    public all(settings: any): any {
        let {src, meta} = settings
        let patterns: PatternStruct[] = this.patterns(src)
        let components: ComponentStruct[] = this.components(src)
        let pages: PageStruct[] = this.pages(src)
        let overviews: OverviewStruct[] = this.overviews(src)

        return { meta, overviews, components, patterns, pages }
    }
}
