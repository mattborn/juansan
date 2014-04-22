
# Juan-san

Juan-san is a simple prototyping environment powered by Grunt that builds static assets for services like Dropbox or Google Drive. It is based on [Brotado](https://github.com/sproutsocial/brotado), but builds to a local mounted folder instead of deploying to a remote server. The name combines the Spanish form of John and the Japanese suffix for respect. This repo also contains LESS code pulled from the [Sprout Social](http://sproutsocial.com) web app codebase.

## Getting Started

If you haven’t used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

First, clone the repository.

```
git clone git@github.com:mattborn/juansan.git <folder-name>
```

Change Line 5 of `Gruntfile.js` to the path to your shared Dropbox or Google Drive folder configured to host web files.

```
dest: '/Users/username/Dropbox/Public',
```

Finally, download dependencies and run the default grunt task.

```
cd <folder-name> && npm install && bower install && grunt
```

This will do an initial build, spool up a server at [localhost:2000](http://localhost:2000), and run the watch task (see Live Reload below). You are all set to go and build an empire!

## Usage

Create unlimited folders in the `source` folder with exactly one `.html`, and zero or several `.less` and `.js` files. Juan-san will automatically compile, minify, and rename these to be served as a static `index.html` file in your destination Dropbox or Google Drive folder.

Warning: having more than one `.html` file in a directory will cause issues with compiling and you may lose changes.

The recommended naming convention is to use the same name for the directory and each file. For example:

```
⊢ example
  ⊢ example.html
  ⊢ example.less
  ⊢ example.js
```

You can create these files from scratch as needed, or use the generator to clone from the template directory:

```
grunt gen --name=example
```

Any changes to the template directory will persist when using the generator.

## Live Reload

Live reload is enabled by default as part of Grunt’s watch task. Download the free [Chrome LiveReload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) to automatically inject the script needed to have the browser reload each time a change is saved to any `.html`, `.less` or `.js` file.

## Multiple Instances

Run multiple servers simultaenously by changing the port number for the connect task in `Gruntfile.js` to something other than `2000`. You may also need to change both `livereload` values in the [watch task](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload) from `true` to a port number if you get an error.

## Source Control

Here are some Git tips for using Juan-san to build an ongoing collection of prototypes.

### Commit early, commit often.

It is important to frequently commit your code just like you would save regularly when editing documents or graphics. Keep your commits tidy and your messages accurate by squashing before merging or rebasing.

Squash the last 5 commits and write a new commit message:

```
git reset --soft HEAD~5 && git commit
```

Squash the last 5 commits, but pre-populate the new commit message with every commit message being squashed:

```
git reset --hard HEAD~5
git merge --squash HEAD@{1}
git commit
```

You could also use `git rebase -i HEAD~5` or `git rebase -i <branch-name>` to squash commits via interactive rebasing, but this is [a bit more involved](https://google.com/search?q=git+interactive-rebase).

### Create a branch for each prototype.

This allows you to work on several prototypes at once without compromising your stable code.

```
git checkout master
git checkout -b <prototype-name> 
```
When the prototype is squashed and ready for primetime, merge with master:

```
git checkout master
git merge <prototype-name>
```

Use `git branch` from the command-line to see all your branches, or use a tool like [SourceTree](http://sourcetreeapp.com) to see branches, commits, remotes, etc. and manage multiple repos in a powerful GUI.

### Never work in master.

After merging a prototype branch into master, create a new branch for your next prototype to ensure the master branch always has reliable, working code while you are in the middle of working on other prototypes.

If you accidentally start coding in master or a branch already dedicated to another prototype or experiment, go ahead and stash your code:

```
git stash
```

This puts your changes in Git purgatory so you can make a new branch:

```
git checkout -b <prototype-name>
```

Then re-apply the changes:

```
git stash pop
```

## Grunt Plugins

Juan-san uses the following plugins.

- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
- [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- [grunt-shell](https://github.com/sindresorhus/grunt-shell)
