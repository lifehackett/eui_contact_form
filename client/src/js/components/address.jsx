'use strict';

var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions');
var ContactStore = require('../contactStore');

var address = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { address: ContactStore.getActivePerson().address };
  },

  onContactStore: function () {
    this.setState({ address: ContactStore.getActivePerson().address });
  },

  onChange: function () {
    var address = this.refs.address.getDOMNode().value;
    actions.setPersonProp({ prop: 'address', value: address });
  },

  render: function () {
    return (
      <div className="form-group">
        <label htmlFor="address" className="control-label">Address</label>
        <input type="text"
               ref="address"
               onChange={ this.onChange }
               id="address"
               className="form-control" 
               value={ this.state.address } />
      </div>
    );
  }
});

module.exports = address;