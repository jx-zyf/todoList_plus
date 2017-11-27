import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import localStorage from '../utils/localStorage';
import AddTodo from './addTodo';
import TodoList from './todoList';
import './todoContent.css';

class TodoContentComponent extends Component {
    state = {
        current: 'all',
        todolist: this.props.todos,
    }
    handleClick = (e) => {
        const { todos } = this.props;
        this.setState({
            current: e.key,
        });
        switch(e.key){
            case 'all':
                this.setState({
                    todolist: todos
                });
                break;
            case 'finished':
                this.setState({
                    todolist: todos.filter(item => 
                        item.isComplete
                    )
                });
                break;
            case 'unfinished':
                this.setState({
                    todolist: todos.filter(item => 
                        !item.isComplete
                    )
                });
                break;
            default: 
                break;
        }
    }
    showAll = () => {
        const { todos } = this.props;
        this.setState({
            todolist: todos,
            current: 'all',
        });
    }
    showFinished = () => {
        const { todos } = this.props;
        this.setState({
            todolist: todos.filter(item => 
                item.isComplete
            ),
            current: 'finished',
        });
    }
    showUnfinished = () => {
        const { todos } = this.props;
        this.setState({
            todolist: todos.filter(item => 
                !item.isComplete
            ),
            current: 'unfinished',
        });
    }
    componentDidUpdate() {
        const { todos } = this.props;
        localStorage.save('todos', todos);
    }
    render() {
        const { todolist } = this.state;
        return (
            <div>
                <AddTodo showAll={this.showAll} />
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    theme="dark"
                >
                    <Menu.Item key="all" className="filterItem" onClick={this.showAll}>
                        <Icon type="database" />ALL
                    </Menu.Item>
                    <Menu.Item key="finished" className="filterItem" onClick={this.showFinished}>
                        <Icon type="smile" />FINISHED
                    </Menu.Item>
                    <Menu.Item key="unfinished" className="filterItem" onClick={this.showUnfinished}>
                        <Icon type="frown" />UNFINISHED
                    </Menu.Item>
                </Menu>
                <TodoList 
                    todos={todolist} 
                    showAll={this.showAll} 
                    showFinished={this.showFinished}
                    showUnfinished={this.showUnfinished}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoContentComponent);