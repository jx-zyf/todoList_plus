import React, { Component } from 'react';
import AddTodo from '../containers/addTodo';
import TodoList from '../containers/todoList';
import './todoContent.css';

class TodoContent extends Component{
    render(){
        return (
            <div className="todoContent">
                <AddTodo />
                <TodoList />
            </div>
        );
    }
}

export default TodoContent;