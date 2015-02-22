var React = require('react');
var templates = require('./templates');

module.exports = React.createClass({  
  render: function() {
    return templates.New({ desc: 'ほげあ' });
  }
});
