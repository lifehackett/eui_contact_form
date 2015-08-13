'use strict';

var Reflux = require('reflux');

var _actions = [
  'addPerson',
  'clearForm',
  'editPerson',
  'removePerson',
  'setPersonProp'
];

module.exports = Reflux.createActions(_actions);