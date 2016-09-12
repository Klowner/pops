import * as fs from 'fs'
import {join} from 'path'

export function updateImport(dir: string, type: string, name: string, ext: string): void {
    let importStatement: string = ''
    let file: string = join(dir, `${type}.${ext}`)

    if (ext === 'scss' || ext === 'less') {
        importStatement = `\n@import '${name}/styles/${name}.${ext}';`
    } else if (ext === 'js') {
        importStatement = `\nmodule.exports.${name.replace(' ', '-')} = require('${name}/scripts/${name}.${ext}');`
    }

    if (fs.existsSync(file)) {
        fs.appendFileSync(file, importStatement)
    } else {
        fs.writeFileSync(file, importStatement)
    }
}
