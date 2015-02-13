'use strict';

require('bootstrap');

var React = require('react');
//var jade = require('react-jade');
var ReactRouter = require('react-router'),
    Route = React.createFactory(ReactRouter.Route),
    RouteHandler = React.createFactory(ReactRouter.RouteHandler),
    DefaultRoute = React.createFactory(ReactRouter.DefaultRoute),
    NotFoundRoute = React.createFactory(ReactRouter.NotFoundRoute);

var templates = require('./templates');

var App = React.createClass({  
  render: function() {
    return templates.Layout({RouteHandler: RouteHandler});
  }
});

var Dashboard = React.createClass({  
  render: function () {
    console.log('render');
    return templates.Dashboard();
  }
});

var Project = require('./project');

var routes = (
  Route({ name: 'app', path: "/", handler: App },
        DefaultRoute({ handler: Dashboard }),
        Route({ name: 'projects', path: 'projects', handler: Project.Root },
              DefaultRoute({ handler: Project.List }),
              Route({ name: 'new', path: 'new', handler: Project.New }),
              Route({ name: 'detail', path: ':project_id', handler: Project.Detail })
             )
       )
);


ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler), document.getElementById('content'));
});
