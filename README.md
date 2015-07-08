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

commonjs:

```js

var lazy = require('lazy-image-loader');

lazy('http://example.com', {});

```

browser:

```html
<script>
  if ('LazyImageLoader' in window) {
    LazyImageLoader('http://example.com', {});
  }
</script>
```

## License

  MIT
