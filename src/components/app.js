import React, { Component } from 'react';

import AddToDo from './add_todo';
import ViewToDo from './view_edit_todo';
import ToDoList from './todo_list';


export default class App extends Component {
  render() {
    return (
      <div className="app row py-4">
        <AddToDo />
        <ViewToDo />
        <ToDoList />
      </div>
    );
  }
}
