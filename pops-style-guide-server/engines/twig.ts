import {join} from 'path'
import * as twig from 'twig'

import {ViewEngine} from './ViewEngine'
import {Config} from '../../pops-commandline-client/config'

let config: any = new Config().getConfig()
let srcDir: string = config.src
let patternDir: string = join(srcDir, 'patterns/')
let componentDir: string = join(srcDir, 'components/')

export class Twig implements ViewEngine {
    engine: any = twig
    preRenderedPartials: boolean = false
    options: any = {
        data: '',
        namespaces: {'patterns': patternDir, 'components': componentDir}
    }

    public renderViewAsText(src: string, context: any): string {
        this.options.data = src

        return this.engine.twig(this.options).render(context)
    }
}