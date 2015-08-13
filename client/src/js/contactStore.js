'use strict';

var Reflux = require('reflux');
var actions = require('./actions');
var states = require('./data/states.json');
var countries = require('./data/countries.json');
var _ = require('lodash');
var USA_COUNTRY_CODE = 'USA';


var ContactStore = Reflux.createStore({
  listenables: [actions],

  init: function () {
    this._activePerson = this._newPerson();
    this._people = [];
  },

  getActivePerson: function () {
    return this._activePerson;
  },

  getCountries: function () {
    return countries;
  },

  getSavedPeople: function () {
    return this._people;
  },

  getSelectedCountry: function () {
    return _.find(countries, { code: this._activePerson.country });
  },

  getStates: function () {
    return _.where(states, { country: this.getSelectedCountry().code });
  },

  onAddPerson: function () {
    this._people.push(this._activePerson);
    this._activePerson = this._newPerson();
    this.trigger();
  },

  onClearForm: function () {
    this._activePerson = this._newPerson();
    this.trigger();
  },

  onEditPerson: function (email) {
    this._activePerson = this._findByEmail(email);
    this._removePerson(email);
    this.trigger();
  },

  onRemovePerson: function (email) {
    this._removePerson(email);
    this.trigger();
  },

  onSetPersonProp: function (payload) {
    this._activePerson[payload.prop] = payload.value;
    this.trigger();
  },

  _findByEmail: function (email) {
    return _.find(this._people, { email: email });
  },

  _newPerson: function () {
    return {
      first: '',
      last: '',
      address: '',
      state: '',
      country: USA_COUNTRY_CODE,
      zip: '',
      email: '',
      phone: ''
    };
  },

  _removePerson: function (email) {
    this._people = _.filter(this._people, function (person) {
      return person.email !== email;
    });
  }
});

module.exports = ContactStore;