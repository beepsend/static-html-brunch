handlebars = require 'handlebars'
sysPath = require 'path'

module.exports = class StaticHtmlCompiler
  brunchPlugin: yes
  type: 'template'
  extension: 'html'
  pattern: /\.(?:html|htm)$/

  constructor: (@config) ->
    null

  compile: (data, path, callback) ->
    try
      result = "module.exports = #{content};"
    catch err
      error = err
    finally
      callback error, result

