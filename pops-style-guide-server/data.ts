import {View} from './view'
import {PageStore, PatternStore, OverviewStore, ComponentStore} from './stores'
import {PageStruct, PatternStruct, OverviewStruct, ComponentStruct} from './structs'

let view: View = new View()

export class Data {
    static pages(src: string): PageStruct[] {
        let store: PageStore = new PageStore(src)
        let pages: PageStruct[] = store.all()

        return pages
            .map((page) => view.addView(page))
    }

    static patterns(src: string): PatternStruct[] {
        let store: PatternStore = new PatternStore(src)
        let patterns: PatternStruct[] = store.all()

        return patterns
            // .map((pattern) => {
            //     view.registerPartial('pattern', pattern.name, pattern.template)

            //     return pattern
            // })
            .map((pattern) => view.addView(pattern))
    }

    static overviews(src: string): OverviewStruct[] {
        let store: OverviewStore = new OverviewStore(src)

        return store.all()
    }

    static components(src: string): ComponentStruct[] {
        let store: ComponentStore = new ComponentStore(src)
        let components: ComponentStruct[] = store.all()

        return components
            // .map((component) => {
            //     view.registerPartial('component', component.name, component.template)

            //     return component
            // })
            .map((component) => view.addView(component))
    }

    static all(src: string): any {
        let patterns = Data.patterns(src)
        let components = Data.components(src)
        let pages = Data.pages(src)
        let overviews = Data.overviews(src)

        return { overviews, components, patterns, pages }
    }
}