'use strict';

var React = require('react');
var Reflux = require('reflux');
var ContactStore = require('../contactStore');
var actions = require('../actions');

var contactList = React.createClass({
  mixins: [Reflux.listenTo(ContactStore, 'onContactStore')],

  getInitialState: function () {
    return { people: ContactStore.getSavedPeople() };
  },

  onContactStore: function () {
    this.setState({ people: ContactStore.getSavedPeople() });
  },

  edit: function (e) {
    actions.editPerson(e.currentTarget.value);
  },

  remove: function (e) {
    actions.removePerson(e.currentTarget.attributes.value.value);
  },

  render: function() {
    var that = this;
    var rows = this.state.people.map(function (person) {
      return (
        <div>
          <button type="button"
                  className="btn btn-link"
                  onClick= { that.edit }
                  value={ person.email }>{ person.last  + ', ' + person.first }</button>
          <i className="fa fa-times remove" onClick={ that.remove } value={person.email}></i>
        </div>
      );
    });

    return (
      <fieldset>
        <legend>Contact List</legend>
        { rows }
      </fieldset>
    );
  }

});

module.exports = contactList;
