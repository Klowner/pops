import * as chalk from 'chalk'

export const help = (function() {
    console.log(`
██████╗  ██████╗ ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔══██╗██╔════╝
██████╔╝██║   ██║██████╔╝███████╗
██╔═══╝ ██║   ██║██╔═══╝ ╚════██║
██║     ╚██████╔╝██║     ███████║
╚═╝      ╚═════╝ ╚═╝     ╚══════╝

Usage: pops <command> [options]

Commands:
  ${chalk.bold('serve')}            Serves Pops' styleguide
  ${chalk.bold('init')}             Creates a pops.config.js in the current folder
  ${chalk.bold('watch')}            Serves Pops' styleguide and watches for changes
  --------------------------------------------------------------------------
  ${chalk.bold('make::component')}  Creates one or multiple component/s
  ${chalk.bold('make::overview')}   Creates one or multiple overview/s
  ${chalk.bold('make::pattern')}    Creates one or multiple pattern/s
  ${chalk.bold('make::page')}       Creates one or multiple page/s
`)
}())
