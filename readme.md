
# Juan-san

Juan-san is a simple prototyping environment powered by Grunt that builds static assets for services like Dropbox or Google Drive. The name combines the Spanish form of John and the Japanese suffix for respect. This repo also contains LESS code pulled from Sprout Social.

## Getting Started

If you haven’t used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

First, clone the repository.

```
git clone git@github.com:mattborn/juansan.git <project-name>
```

Then download dependencies and run the default grunt task.

```
cd <project-name> && npm install && bower install && grunt
```

This will do an initial build, spool up a server at [localhost:2000](http://localhost:2000), and run the watch task (see Live Reload below).

## Usage

Create unlimited directories with exactly one `.html`, and zero or several `.less` and `.js` files in each directory and Juan-san will automatically compile, minify, and rename these to be served as static files.

Warning: having more than one `.html` file in a directory will cause issues with compiling and you may lose changes.

The recommended naming convention is to use the same name for the directory and each file. For example:

```
--/example
----example.html
----example.less
----example.js
```

You can create these files from scratch as needed, or use the generator to clone from the template directory:

```
grunt gen --name=example
```

Any changes to the template directory will persist when using the generator.

## Live Reload

Live reload is enabled by default as part of Grunt’s watch task. Download the free [Chrome LiveReload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) to automatically inject the script needed to have the browser reload each time a change is saved to any `.html` or `.less` file.

## Multiple Instances

Run multiple servers simultaenously by changing the port number for the connect task in `Gruntfile.js`. You may also need to change both `livereload` values in the [watch task](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload) from `true` to a port number if you get an error.

## Grunt Plugins

Juan-san uses the following plugins. 

- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
- [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
