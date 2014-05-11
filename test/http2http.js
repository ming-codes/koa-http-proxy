
suite('koa-http-proxy', function() {
  var http = require('http')

  var koa = require('koa')
    , request = require('supertest')

  var proxy = require('../index')

  var targetServer, proxyServer

  setup(function(callback) {
    targetServer = http.createServer(function(req, res) {
      res.writeHead(200)
      res.write('target responded')
      res.end()
    }).listen(3000)

    proxyServer = koa()
      .use(proxy('http://localhost:3000'))
      .listen(4000, callback)
  })

  test('put', function(done) {
    request(proxyServer)
      .put('/')
      .expect(200, 'target responded', done)
  })

  test('get', function(done) {
    request(proxyServer)
      .get('/')
      .expect(200, 'target responded', done)
  })

  test('post', function(done) {
    request(proxyServer)
      .post('/')
      .expect(200, 'target responded', done)
  })

  test('delete', function(done) {
    request(proxyServer)
      .delete('/')
      .expect(200, 'target responded', done)
  })

  teardown(function() {
    targetServer.close()
    proxyServer.close()
  })

})
