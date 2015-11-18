'use strict';
var ready = require('document-ready');
var lazy = require('../index');
ready(function () {
  var destroy = lazy(null, {
    url: function (width, path) {
      return path;
    },
    onlyInViewPort: true
  });

  setTimeout(destroy, 5000);
});
