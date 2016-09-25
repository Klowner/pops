import {bold} from 'chalk'

export default (function () {
    console.log(`
██████╗  ██████╗ ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔══██╗██╔════╝
██████╔╝██║   ██║██████╔╝███████╗
██╔═══╝ ██║   ██║██╔═══╝ ╚════██║
██║     ╚██████╔╝██║     ███████║
╚═╝      ╚═════╝ ╚═╝     ╚══════╝

Usage: pops <command> [options]

Commands:
  ${bold('serve')}            Serves Pops' styleguide
  ${bold('init')}             Creates a pops.config.js in the current folder
  ${bold('watch')}            Serves Pops' styleguide and watches for changes
  --------------------------------------------------------------------------
  ${bold('make::component')}  Creates one or multiple component/s
  ${bold('make::overview')}   Creates one or multiple overview/s
  ${bold('make::pattern')}    Creates one or multiple pattern/s
  ${bold('make::page')}       Creates one or multiple page/s
  --------------------------------------------------------------------------
  ${bold('version')}          Prints pops version
`)
}())
