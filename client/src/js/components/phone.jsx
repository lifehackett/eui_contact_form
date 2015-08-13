'use strict';

var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions');
var ContactStore = require('../contactStore');

var phone = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { phone: ContactStore.getActivePerson().phone };
  },

  onContactStore: function () {
    this.setState({ phone: ContactStore.getActivePerson().phone });
  },

  onChange: function () {
    var phone = this.refs.phone.getDOMNode().value;
    actions.setPersonProp({ prop: 'phone', value: phone });
  },

  render: function() {
    return (
      <div className="form-group required">
        <label htmlFor="phone" className="control-label">Phone</label>
        <input type="text" 
               id="phone" 
               ref="phone"
               onChange={ this.onChange }
               value={ this.state.phone }
               className="form-control"
               required />
      </div>
    );
  }

});

module.exports = phone;