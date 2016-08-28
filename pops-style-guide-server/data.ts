import {PageStore, PatternStore, OverviewStore, ComponentStore} from './stores'
import {PageStruct, PatternStruct, OverviewStruct, ComponentStruct} from './structs'

export class Data {
    static pages(src: string): PageStruct[] {
        let store: PageStore = new PageStore(src)

        return store.all()
    }

    static patterns(src: string): PatternStruct[] {
        let store: PatternStore = new PatternStore(src)

        return store.all()
    }

    static overviews(src: string): OverviewStruct[] {
        let store: OverviewStore = new OverviewStore(src)

        return store.all()
    }

    static components(src: string): ComponentStruct[] {
        let store: ComponentStore = new ComponentStore(src)

        return store.all()
    }

    static all(src: string): any {
        return {
            overviews: Data.overviews(src),
            components: Data.components(src),
            patterns: Data.patterns(src),
            pages: Data.pages(src)
        }
    }
}