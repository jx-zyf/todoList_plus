import React, { Component } from 'react';
import TodoContentComponet from '../containers/todoContent';
import './todoContent.css';

class TodoContent extends Component{
    render(){
        return (
            <div className="todoContent">
                <TodoContentComponet />
            </div>
        );
    }
}

export default TodoContent;