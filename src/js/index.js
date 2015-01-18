'use strict';

global.jQuery = require('jquery');
require('bootstrap');

var hg = require('mercury');
var h = require('mercury').h;

function App() {
  this.state = hg.state({
    value: hg.value(0),
    channels: {
      
    }
  });
}

App.prototype.render = function render(state) {
  return h('h1', [
    'ダッシュのボード'
  ]);
};

var app = new App();

hg.app(document.getElementById('main'), app.state, app.render.bind(app));
