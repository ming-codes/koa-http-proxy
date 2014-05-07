
# koa-http-proxy

koajs wrapper over nodejitsu's node-http-proxy.

## Installation

```bash
$ npm install koa-http-proxy
```

## Options

All options are passed to `node-http-proxy`, except that if options is passed
as a string, it will normalized as options' target.

See [node-http-proxy](/nodejitsu/node-http-proxy#options) for full list of
accepted options.


## Example

```js
var koa = require('koa')

var $proxy = require('koa-http-proxy')

koa()
    .use($proxy('https://www.google.com'))
    .listen(3000)

```

## License

MIT
