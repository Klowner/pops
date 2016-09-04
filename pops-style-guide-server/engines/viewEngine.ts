export interface ViewEngine {
    engine: any
    preRenderedPartials: boolean
    renderViewAsText(src: string, context: any): string
}