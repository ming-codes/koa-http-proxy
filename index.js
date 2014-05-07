
module.exports = function(options) {
    var proxy

    if (typeof options == 'string') {
        options = { target: options }
    }

    proxy = require('http-proxy').createProxyServer(options)

    return function *() {
        var ctx = this

        // yield to a thunk
        yield function(callback) {
            proxy.web(ctx.req, ctx.res, callback)
        }
    }
}
