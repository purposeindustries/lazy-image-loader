# lazy-image-loader

## Installation

using npm:

```bash
$ npm install lazy-image-loader
```

in the browser:

```html
<script src="lazy-image-loader.js"></script>
```

## Usage

It's recommended to wait for the window's onload event.

lazy(host, [options]);

commonjs:

```js

var lazy = require('lazy-image-loader');
var $ = require('jquery');

$(window).load(function () {
  lazy('http://example.com', {});
});

```

browser:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
  $(window).load(function () {
    if ('LazyImageLoader' in window) {
      LazyImageLoader('http://example.com', {});
    }
  });
</script>
```
## Options

- url (Function): You can set your own url getter function. It gets two parameters: width and path.

## License

  MIT
