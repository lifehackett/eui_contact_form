'use strict';

var React = require('react');
var Name = require('../components/name.jsx');
var Address = require('../components/address.jsx');
var Country = require('../components/country.jsx');
var State = require('../components/state.jsx');
var Zip = require('../components/zip.jsx');
var Phone = require('../components/phone.jsx');
var Email = require('../components/email.jsx');
var actions = require('../actions');

var entryForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();

    var isValid = this.refs.form.getDOMNode().checkValidity();

    if (isValid) {
      actions.addPerson();
    }
  },

  clear: function () {
    actions.clearForm();
  },

  render: function () {
    return (
      <form id="my-form" ref="form" role="form" onSubmit={ this.onSubmit }>
        <Name namePart="first" />
        <Name namePart="last" />
        <Address />
        <State />
        <Country />
        <Zip />
        <Phone />
        <Email />
        <button className="btn btn-primary" type="submit">Save</button>
        <button className="btn btn-secondary pull-right" type="button" onClick={ this.clear }>Clear</button>
      </form>
    );
  }
});

module.exports = entryForm;