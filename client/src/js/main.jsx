'use strict';

var React = require('react');
var EntryForm = require('./containers/entryForm.jsx');
var ContactList = require('./containers/contactList.jsx');

React.render(
  <div className="container">
    <div className="row">
      <div className="col-xs-3">
        <ContactList />
      </div>
      <div className="col-xs-9">
        <EntryForm />
      </div>
    </div>
  </div>,      
  document.getElementById('main'));