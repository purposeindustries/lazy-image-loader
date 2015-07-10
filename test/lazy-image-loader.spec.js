'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var fixture = fs.readFileSync('./test/fixture.html');
var lazy = require('..');

describe('lazy-image-loader', function () {

  beforeEach(function (done) {
    jsdom.env(fixture.toString(), function (err, win) {
      if (err) {
        throw err;
      }
      global.document = win.document;
      done();
    });
  });

  it('should generate images with the proper src attr value', function () {

    lazy('http://example.com');
    var imgs = document.querySelectorAll('img');
    imgs.length.should.equal(3);
    imgs[0].getAttribute('src').should.equal('http://example.com/0/path/to');

  });

  it('should use the external url getter', function () {

    lazy('http://example.com', {
      url: function (width, path) {
        width.should.equal(0);
        path.should.equal('/path/to');
        return 'https://www.blah.blah';
      }
    });
    var imgs = document.querySelectorAll('img');
    imgs.length.should.equal(3);
    imgs[0].getAttribute('src').should.equal('https://www.blah.blah');

  });

  it('should work with custom class names', function () {
    lazy('http://example.com', {
      className: '.custom-class'
    });
    var imgs = document.querySelectorAll('img');
    imgs.length.should.equal(2);
    imgs[0].getAttribute('src').should.equal('http://example.com/0/foo/bar');
  });

  it('should work with custom path attribute names', function () {
    lazy('http://example.com', {
      className: '.lazy-custom-attr',
      pathAttribute: 'data-custom-attr'
    });
    var imgs = document.querySelectorAll('img');
    imgs.length.should.equal(1);
    imgs[0].getAttribute('src').should.equal('http://example.com/0/bar');
  });
});
