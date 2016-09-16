# Reveal.js for NorcalJS Meetup

The purpose of this fork and sub-package is to provide presentation page generation for the NorcalJS Meetup Group, while still being able to merge in new changes from the original repository. As long as the paradigm remains the same, updating Reveal is doing a merge from upstream master.

# Generate

- clone this repo `git clone git@github.com:garajo/reveal.js-NorcalJS.git`
- To run the development server and see sample presentations: From the root folder, run `npm start`
  - navigate to http://localhost:8000/ for a 'Hello World' example
  - navigate to http://localhost:8000/demo.html to see original Reveal.js demo
- To generate the default app
  - ```cd ncjs && npm run generate```
  - navigate to http://localhost:8000/ncjs/presos/default.html to see a bare template

## Parameters

Generating an new presentation from template:

```
cd ncjs
npm run generate -- filename='white' title='White themed' themecolor='white'

# -f flag forces overwrite
npm run generate -- -f filename='white' title='White themed' themecolor='white'
```

This will generate a file, `presos/white.html` with other customizations. If the server is already running, you can navigate to `http://localhost:8000/ncjs/presos/white.html` to see your newly generated app. Running `npm run generate` without parameters will output a _default.html_ file.

# Build Your Presentation

Simply edit the generated html in the style of Reveal.js. Check out the `demo.html` on the server and it's source code for reference. Check out the API docs too, https://github.com/hakimel/reveal.js#api. Changes you save in `presos/` are reloaded in the browser. You can serve your presentation using the development server of the upstream repo as noted above, or use your own. You can even open the file straight from your browser, but you should not move it out of the `presos/` folder.

Alteratively, a zipped directory of a portable implementation is made. But it serves no relations to the .html file generated, and would have to be edited and serve on its own.

## defaults
```
{
  filename: 'default.html',

  title: 'NorcalJS Meetup',

  themecolor: 'black',

  stylesheet: '../../css/reveal.css',

}
```
# Theming

https://github.com/hakimel/reveal.js#theming

# Library Maintenance

## Adding More Parameters
- In _template.html_ put a variable name between `<%-` and `%>` for the value you would like dynamically defined, like this `<%- newparam %>`
- Then in _index.html_ add the variable name as a key in the options object and a default value, like this
```
const options = {
  newparam: 'default value',
  ...
}
```
- Make sure you update the README.

## Updating Reveal.js

Sync this fork with the [original repository this was forked from](https://github.com/hakimel/reveal.js)

From the repository root:
```
git remote add upstream https://github.com/hakimel/reveal.js
git fetch upstream
git checkout master
git merge upstream/master
```
* There is a potential merge conflict with ../Gruntfile.js.
