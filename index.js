'use strict';

var vportHelper = require('verge');
var listen = require('event-listener');
var throttle = require('lodash.throttle');

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

  function handleItem(item, options) {
    options = options || {};
    var url = options.url;
    var pathAttr = options.pathAttribute || 'data-path';
    var sample = options.sample;
    var findAndReplace = options.findAndReplace;
    var path = item.getAttribute(pathAttr);
    var src = url(Math.round(sample.width), path);
    item.$$lazyHandled$$ = true;
    if (findAndReplace) {
      var imgToBeReplaced = item.querySelector('img');
      if (imgToBeReplaced) {
        imgToBeReplaced.src = src;
        return;
      }
    }
    var img = document.createElement('img');
    img.src = src;
    item.appendChild(img);
  }

  function handleItems(items, filter, options) {
    if (typeof filter === 'function') {
      items = items.filter(filter);
    }
    items
      .forEach(function (item) {
        handleItem(item, options);
      });
  }

  /**
   * @param  {String} host - The host where the images come from
   * @param  {Object} [options={}] - options object
   * @return {void}
   */
  return function init(host, options) {
    options = options || {};
    var className = options.className || '.lazy-image';
    var onlyInViewPort = !!options.onlyInViewPort;
    var items = [].slice.call(document.querySelectorAll(className));

    options.url = options.url || function (width, path) {
      return host + '/' + width + path;
    };

    options.sample = getSample(items);

    function filterForScroll(item) {
      return vportHelper.inY(item) && !item.$$lazyHandled$$;
    }

    function filterForInit(item) {
      return !onlyInViewPort || vportHelper.inY(item);
    }

    if (onlyInViewPort) {
      var scrollListener = listen(window, 'scroll resize orientationchange',
        throttle(function () {
          handleItems(items, filterForScroll, options);
      }, 200));
    }
    handleItems(items, filterForInit, options);

    return function () {
      if (scrollListener) {
        scrollListener.remove();
      }
    };
  };
}));
