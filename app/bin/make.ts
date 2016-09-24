import {red} from 'chalk'

import * as generators from './generators'

function noArgs() {
    console.log(`${red.bold('Error:')} an argument/name must be given when using a make command`)
}

export class Make {
    static page(args: string[], config: any): void {
        if (args.length) {
            new generators.PageGenerator(args, config)
        } else {
            noArgs()
        }
    }

    static pattern(args: string[], config: any): void {
        if (args.length) {
            new generators.PatternGenerator(args, config)
        } else {
            noArgs()
        }
    }

    static overview(args: string[], config: any): void {
        if (args.length) {
            new generators.OverviewGenerator(args, config)
        } else {
            noArgs()
        }
    }

    static component(args: string[], config: any): void {
        if (args.length) {
            new generators.ComponentGenerator(args, config)
        } else {
            noArgs()
        }
    }
}
