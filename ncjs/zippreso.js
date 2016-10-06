const fs = require('fs')
const archiver = require('archiver')
const config = require('./package.json').config
const escapeStringRegexp = require('escape-string-regexp')

const defaults = {
  reservedfilename : 'default',
  savehtml: 'index.html',
  dirpath : 'presos/',
  basepath: config.upstreampath,
}

const options = {
  filename: `${defaults.reservedfilename}`,
}

const args = process.argv.filter((val, i, arr) => val.match(/^.*=.*$/))

const applyargs = args.reduce((prev, curr, i) => {
  const kv = curr.split('=')
  return Object.assign(prev, {[kv[0]]: kv[1]})
}, {})

Object.assign(options, defaults, applyargs)

const writepath = defaults.dirpath + options.filename.replace(/\.html?$/, '')

const htmlcontent = fs.readFileSync(`${options.dirpath}${options.filename}.html`).toString()

var output = fs.createWriteStream(`${writepath}.zip`)
const archive = archiver('zip')

output.on('close', function() {
  console.log(`${writepath}.zip has been written.`, '\n');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

const escapedString = escapeStringRegexp(options.basepath);
const writecontent = htmlcontent.replace(new RegExp(escapedString, 'g'), '');
archive
  .append(writecontent, {name: options.savehtml})
  .glob('../css/**')
  .glob('../js/**')
  .glob('../lib/**')
  .glob('../images/**')
  .glob('../plugin/**')
  .finalize()
