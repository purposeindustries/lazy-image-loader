'use strict';

(function (factory) {

  if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    window.LazyImageLoader = factory();
  }

}(function () {

  /**
   * Attempts to find out the size of the lazy image. It continues
   * the process until it finds a value that's greater than zero.
   *
   * @private
   * @param  {Array} items - The array of the lazy elements
   * @param  {Number} i - The index of the element in the array
   * @return {Object} - Returns the element's bounding client rect.
   */
  function getSample(items, i) {
    i = i || 0;

    if (i > items.length - 1) {
      return {
        width: 0
      };
    }

    var item = items[i];
    var sample = item.getBoundingClientRect();
    if (!sample.width) {
      return getSample(items, ++i);
    }
    return sample;
  }

  /**
   * Parses all the lazy elements and generates <img> tags with src.
   *
   * @param  {String} host - The host where the images come from
   * @param  {Object} [options={}] - options object
   * @return {void}
   */
  return function init(host, options) {
    options = options || {};
    var className = options.className || '.lazy-image';
    var pathAttr = options.pathAttribute || 'data-path';
    var url = (typeof options.url === 'function') ?
      options.url :
      function (width, path) {
        return host + '/' + width + path;
      };
    var items = [].slice.call(document.querySelectorAll(className));
    var sample = getSample(items);

    items.forEach(function (item) {

      var path = item.getAttribute(pathAttr);
      var img = document.createElement('img');
      img.src = url(Math.round(sample.width), path);

      item.appendChild(img);

    });

  };
}));
