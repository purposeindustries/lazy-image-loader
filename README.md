# Lazy Image Loader

> Parses the DOM and looks for elements to load images in a deferred manner.

> You have to create lazy image elements by the following rules to allow the lazy loader to reach them.

> With the following setup, the lazy loader attempts to load an image from a generated url by creating an <img> element and appending it into the lazy element.
> It tries to calculate the width of the parent element and set the following url as the src attribute of the newly generated <img> element:

> So, for example if the width of the parent element is 400px, the url becomes:
> http://example.com/400/path/to/your/image.jpg

```html
<div class="lazy-image" data-path="/path/to/your/image.jpg"></div>

<script>
  $(window).load(function () {
    if ('LazyImageLoader' in window) {
      LazyImageLoader('http://example.com', {});
    }
  });
</script>
```

## Installation

> It supports browser environments and CommonJS format.

using npm:

```bash
$ npm install lazy-image-loader
```

in the browser:

```html
<script src="lazy-image-loader.js"></script>
```

## Usage

> It's recommended to wait for the window's onload event.

```
lazy(host, [options]);
```

Lazy loader prefers leading slash when you set the path and please avoid to use trailing slash when you set the host.

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

- `url` (Function) - You can set your own url getter function. It gets two parameters: `width` and `path`.

## License

  [MIT](LICENSE) &copy; Purpose Industries
