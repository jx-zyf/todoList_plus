import React, { Component } from 'react';
import './App.css';
import TodoHeader from './todoHeader';
import TodoContent from './todoContent';

class App extends Component {
  render() {
    return (
      <div className="todoWrap">
        <TodoHeader />
        <TodoContent />
      </div>
    );
  }
}

export default App;
