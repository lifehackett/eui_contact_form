'use strict';

var React = require('react');
var Reflux = require('reflux');
var ContactStore = require('../contactStore');
var _ = require('lodash');
var actions = require('../actions');


var country = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { 
      countries: ContactStore.getCountries(),
      selectedCountry: ContactStore.getSelectedCountry()
    };
  },

  onContactStore: function () {
    this.setState({ selectedCountry: ContactStore.getSelectedCountry() });
  },

  onChange: function () {
    var selectedCountryCode = this.refs.country.getDOMNode().value;
    actions.setPersonProp({ prop: 'country', value: selectedCountryCode });
  },

  render: function() {
    var countryOptions = this.state.countries.map(function (country) {
      return (<option value={ country.code } >{ country.name }</option>);
    });

    return (
      <div claassName="form-group">
        <label htmlFor="country" className="control-label">Country</label>
        <select className="form-control" 
                id="country" 
                ref="country"
                value={ this.state.selectedCountry.code } 
                onChange={ this.onChange }>
          { countryOptions }
        </select>
      </div>
    );
  }

});

module.exports = country;

