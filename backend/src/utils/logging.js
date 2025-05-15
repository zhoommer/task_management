var path = require('path')
var rfs = require('rotating-file-stream') // version 2.x

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

module.exports = accessLogStream;

