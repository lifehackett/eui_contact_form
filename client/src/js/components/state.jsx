'use strict';

var React = require('react');
var Reflux = require('reflux');
var ContactStore = require('../contactStore');
var actions = require('../actions');

var state = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { 
      states: ContactStore.getStates(),
      selectedState: ContactStore.getActivePerson().state
    };
  },

  onContactStore: function () {
    this.setState({ 
      states: ContactStore.getStates(),
      selectedState: ContactStore.getActivePerson().state 
    });
  },

  onChange: function () {
    var stateCode = this.refs.state.getDOMNode().value;
    actions.setPersonProp({ prop: 'state', value: stateCode });
  },

  render: function() {
    var stateOptions = this.state.states.map(function (state) {
      return (<option value={ state.code } >{ state.name }</option>);
    });

    stateOptions.unshift(<option value="" disabled hidden>-</option>);

    return (
      <div claassName="form-group">
        <label htmlFor="state" className="control-label">State</label>
        <select className="form-control" 
                id="state" 
                ref="state" 
                value={ this.state.selectedState }
                onChange={ this.onChange }>
          { stateOptions }
        </select>
      </div>
    );
  }

});

module.exports = state;