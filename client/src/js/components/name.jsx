'use strict';

var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions');
var ContactStore = require('../contactStore');
var _ = require('lodash');

var personName = React.createClass({
  propTypes: {
    namePart: React.PropTypes.string.isRequired
  },

  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    var state = {};
    state[this.props.namePart] = ContactStore.getActivePerson()[this.props.namePart];
    return state;
  },

  onContactStore: function () {
    var state = {};
    state[this.props.namePart] = ContactStore.getActivePerson()[this.props.namePart];
    this.setState(state);
  },

  onChange: function () {
    var name = this.refs.name.getDOMNode().value;
    actions.setPersonProp({ prop: this.props.namePart, value: name });
  },

  render: function () {
    return (
      <div className="form-group required">
        <label htmlFor={ this.props.namePart } className="control-label">{ _.capitalize(this.props.namePart) + ' Name' }</label>
        <input type="text" 
               id={ this.props.namePart } 
               className="form-control"
               ref="name"
               onChange={ this.onChange }
               value={ this.state[this.props.namePart]}
               required 
               pattern=".{3,}" 
               title="Must be at least 3 characters"/>
      </div>
    );
  }
});

module.exports = personName;
