'use strict';

var vportHelper = require('verge');
var listen = require('event-listener');
var throttle = require('lodash.throttle');

function noop() {}

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
    var pathAttr = options.pathAttribute || 'data-path';
    var hostAttr = options.hostAttribute || 'data-host';
    var host = item.getAttribute(hostAttr) || options.host;
    var sample = options.sample || {};
    var findAndReplace = options.findAndReplace;
    var onBeforeSet = typeof options.onBeforeSet === 'function'
      ? options.onBeforeSet
      : noop;
    var path = item.getAttribute(pathAttr);
    var url = options.url || function (width, p) {
      return host + '/' + width + p;
    };
    var src = url(Math.round(sample.width || item.clientWidth || 0), path);
    item.$$lazyHandled$$ = true;
    if (findAndReplace) {
      var imgToBeReplaced = item.querySelector('img');
      if (imgToBeReplaced) {
        onBeforeSet(imgToBeReplaced);
        imgToBeReplaced.src = src;
        return;
      }
    }
    var img = document.createElement('img');
    onBeforeSet(img);
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
    var useSampling = typeof options.useSampling !== 'undefined'
      ? options.useSampling
      : true;

    options.host = host;

    if (useSampling) {
      options.sample = getSample(items);
    }

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
