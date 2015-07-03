(function (factory) {
  'use strict';

  if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    window.LazyImageLoader = factory();
  }

}(function () {

  return function init(host) {

    var items = [].slice.call(document.querySelectorAll('.lazy-image'));
    var len = items.length;
    var sample;

    items.forEach(function (item) {

      if (!sample) {
        sample = item.getBoundingClientRect();
      }

      var path = item.getAttribute('data-path');
      var img = document.createElement('img');
      img.src = host + '/' + Math.round(sample.width) + '/' + path;

      item.appendChild(img);

    });

  };
}));
