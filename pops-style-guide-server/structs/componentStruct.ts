export interface ComponentStruct {
    name: string
    
    doc: string
    context: any
    style: string
    script: string
    template: string
    
    paths: {
        doc: string
        style: string
        script: string
        template: string
    }

}