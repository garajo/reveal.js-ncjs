/**
* @Author: gajo
* @Date:   2016-09-14T22:36:30-07:00
* @Last modified by:   gajo
* @Last modified time: 2016-09-14T22:37:02-07:00
*/

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const config = require('./package.json').config

const defaults = {
  reservedfilename : 'default',
  dirpath : 'presos/',
  templatefile: 'template.html',
  basepath: config.upstreampath,
}

const options = {
  filename: `${defaults.reservedfilename}`,
  title: 'NorcalJS Meetup',
  themecolor: `black`,
  stylesheet: `${defaults.basepath}css/reveal.css`,
}

const args = process.argv.filter((val, i, arr) => val.match(/^.*=.*$/))

const applyargs = args.reduce((prev, curr, i) => {
  const kv = curr.split('=')
  return Object.assign(prev, {[kv[0]]: kv[1]})
}, {})

Object.assign(options, defaults, applyargs)

const template = fs.readFileSync(defaults.templatefile).toString()

const tmplinstance = template.replace(/<%-(.*?)%>/g, (match, p1) => {
  if(!options[p1.trim()]) throw new Error('no key found')
  return options[p1.trim()]
})

const writepath = defaults.dirpath + options.filename.replace(/\.html?$/, '')

fs.stat(`${writepath}.html`, (err, stat) => {

  if(err == null
    && writepath !== `${defaults.dirpath}${defaults.reservedfilename}`
    && process.argv.indexOf('-f') === -1
  ) {
      throw new Error(`File exists ${writepath}`)
  } else {

    // file does not exist
    fs.writeFile(`${writepath}.html`, tmplinstance, (err, msg) => {
      if(err) throw err

      console.log(`With your dev server running, open: http://localhost:8000/ncjs/${options.dirpath}${options.filename}.html`, '\n')
    })
  }
})
