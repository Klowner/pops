import * as pug from 'pug'

import {ViewEngine} from './viewEngine'

export class Pug implements ViewEngine {
	engine: any = pug
	preRenderedPartials: boolean = false

	private compile(source: string): pug.TemplateFunction {
		return this.engine.compile(source);
	}

	public renderViewAsText(src: string, context: any): string {
		let template : pug.TemplateFunction = this.compile(src)

		return template(context)
	}
}

