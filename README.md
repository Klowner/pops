# Pops

A commandline client that is capable of generating styleguides, and styleguide
based workflows.

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


## Config

To start a pops styleguide you will first need a `pops.config.js` file.
After installing pops run `$ pops init` to generate a `pops.config.js` in the current
directory. It should look like the following.

```javascript
var path = require('path');

module.exports = {
    src: path.join(__dirname, './styleguide'),
    globals: {
        stylesheets: [
            // Include stylesheets
        ],
        javascripts: [
            // Include javascripts
        ]
    },
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    }
};
```

### src

The `src` option tells pops where it should place any generated items. It is also
where pops will look when serving it's styleguide.

### globals

The `globals` option refers to global stylesheets and javascripts that are used by
the styleguide items.

### ext

The `ext` option tells pops what file extension you wish to use. Pops will read this
and create files using these intructions.

Templates by default work in either handlebars or twig format.

## Contributing

Feel free to open an [issue](https://github.com/BrianDGLS/pops/issues) 
or [pull request](https://github.com/BrianDGLS/pops/pulls).

Pay special attention to issues mark with the `help wanted` label.

Pull requests should be made against the develop branch.

Please also make an attempt to keep your code style aligned with the code 
which currently exists.

You should also compile your typscript files and any frontend changes 
before commiting.
