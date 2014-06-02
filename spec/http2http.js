
var http = require('http')
  , koa = require('koa')
  , async = require('async')
  , request = require('supertest')

var $proxy = require('../index')

var TARGET_SERVER_PORT = 8000
  , PROXY_SERVER_PORT = 7000

describe('Proxying from HTTP to HTTP', function() {

  before(function(done) {
    async.parallel([
      function(cb) {
        this.targetServer = http.createServer(function(req, res) {
          res.writeHead(404)
          res.end()
        }).listen(TARGET_SERVER_PORT, cb)
      }.bind(this),
      function(cb){
        this.proxyServer = koa().use($proxy({
          target: 'http://localhost:' + TARGET_SERVER_PORT
        })).listen(PROXY_SERVER_PORT, cb)
      }.bind(this),
    ], done)
  })

  ![ 'GET', 'POST', 'PUT', 'DELETE' ].forEach(function(method) {
    it('should proxy ' + method + ' request', function(done) {
      request(this.proxyServer)[method.toLowerCase()]('/')
        .expect(404)
        .end(done)
    })
  })
})
