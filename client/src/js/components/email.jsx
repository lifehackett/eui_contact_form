'use strict';

var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions');
var ContactStore = require('../contactStore');

var email = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { email: ContactStore.getActivePerson().email };
  },

  onContactStore: function () {
    this.setState({ email: ContactStore.getActivePerson().email });
  },

  onChange: function () {
    var email = this.refs.email.getDOMNode().value;
    actions.setPersonProp({ prop: 'email', value: email });
  },

  render: function() {
    return (
      <div className="form-group required">
        <label htmlFor="email" className="control-label">Email</label>
        <input type="email" 
               id="email" 
               ref="email"
               onChange= { this.onChange }
               className="form-control" 
               value={ this.state.email }
               required />
      </div>
    );
  }

});

module.exports = email;