import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

//components
import Header from './components/layout/Header';
import Todos from './components/Todos';
import Addtodo from './components/Addtodo';
import About from './components/pages/About';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=25')
      .then(res => this.setState({ todos: res.data }))
  }

  //toggles completed status on todo checkbox
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  //delete list item. Makes request to delete on server, then filters on front end to be safe
  deleteItem = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]} ));
  }

  //add list item
  addTodo = (title) => {

    //HTTP request to server, Using jsonplaceholder as dummy backend 
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false

    }) //then appends it to array of todo items
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route path="/" render={props => (
              <React.Fragment>
                <Addtodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteItem={this.deleteItem} />
              </React.Fragment>  
              )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
