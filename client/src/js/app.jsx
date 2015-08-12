'use strict';

var React                 = require('react');
var Header                = require('./common/components/header.jsx');
var ContactTableContainer = require('./contacts/components/contactTableContainer.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <ContactTableContainer />
      </div>
    );
  }
});

module.exports = App;