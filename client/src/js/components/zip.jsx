'use strict';

var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions');
var ContactStore = require('../contactStore');

var zip = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { zip: ContactStore.getActivePerson().zip };
  },

  onContactStore: function () {
    this.setState({ zip: ContactStore.getActivePerson().zip });
  },

  onChange: function () {
    var zip = this.refs.zip.getDOMNode().value;
    actions.setPersonProp({ prop: 'zip', value: zip });
  },

  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="zip" className="control-label">Zip Code</label>
        <input type="text" 
               id="zip"
               ref="zip"
               onChange={ this.onChange }
               value={ this.state.zip }
               className="form-control" />
      </div>
    );
  }

});

module.exports = zip;