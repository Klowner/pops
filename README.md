# Pops

A commandline client that is capable of generating styleguides, and styleguide
based workflows.

## Dev Set Up

You should have the latest node and typescript versions installed.

    $ npm install
    $ typings install

    // Build Typescript (Cli, and Server)
    $ tsc

    // Build Vue App
    $ webpack

    // Running in dev
    $ node build/pops-commandline-client/pops.js
    // EG: make a component
    $ node build/pops-commandline-client/pops.js make::component test

NB: As this is in dev certain exceptions have been made. For example an example
styleguide folder is in the repo. This will be removed when ready for external use.

## Installation

Install globally for best use.

    $ npm install -g pops

Once installed you will have access to the pops commandline-client.

    $ pops
      
      ██████╗  ██████╗ ██████╗ ███████╗
      ██╔══██╗██╔═══██╗██╔══██╗██╔════╝
      ██████╔╝██║   ██║██████╔╝███████╗
      ██╔═══╝ ██║   ██║██╔═══╝ ╚════██║
      ██║     ╚██████╔╝██║     ███████║
      ╚═╝      ╚═════╝ ╚═╝     ╚══════╝

      Usage: pops <command> [options]

      Commands:
        serve            Serves Pops' styleguide
        init             Creates a pops.config.js in the current folder
        watch            Serves Pops' styleguide and watches for changes
        ----------------------------------------------------------------
        make::component  Creates one or multiple component/s
        make::overview   Creates one or multiple overview/s
        make::pattern    Creates one or multiple pattern/s
        make::page       Creates one or multiple page/s


## Contributing

Keep code in the same style:

    1. 4 spaces indent
    2. No semi-colons
    3. Do not use `const`