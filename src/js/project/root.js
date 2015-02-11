var React = require('react'),
    ReactRouter = require('react-router'),
    RouteHandler = React.createFactory(ReactRouter.RouteHandler);

var templates = require('./templates');

module.exports = React.createClass({  
  render: function() {
    return RouteHandler();
  }
});
