(function (factory) {
  'use strict';

  if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    window.LazyImageLoader = factory();
  }

}(function () {

  function getSample(items, i) {
    i = i || 0;

    if (i > items.length - 1) {
      return null;
    }

    var item = items[i];
    sample = item.getBoundingClientRect();
    if (!sample.width) {
      return getSample(items, ++i);
    }
    return sample;
  }

  return function init(host, options) {
    options = options || {};
    var url = (typeof options.url === 'function') ? options.url : function () {};
    var items = [].slice.call(document.querySelectorAll('.lazy-image'));
    var len = items.length;
    var sample;
    var sample = getSample(items);

    items.forEach(function (item) {

      var path = item.getAttribute('data-path');
      var img = document.createElement('img');
      img.src = (url() || host + '/' + Math.round(sample.width) + '/') + path;

      item.appendChild(img);

    });

  };
}));
