import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Modal, Form, Input } from 'antd';
import localStorage from '../utils/localStorage';
import './todoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            editId: '',
            editValue: ''
        }
    }
    // 删除todo
    delHandle = (e) => {
        let id = Number(e.target.getAttribute('data-id'));
        const { dispatch, todos } = this.props;
        dispatch({
            type: 'DEL_TODO',
            payload: {
                id
            }
        });
        message.success('delete success!');
        localStorage.save('todos',todos);
    }
    // 切换todo状态
    toggleHandle = (e) => {
        let id = Number(e.target.getAttribute('data-id'));
        let msg = e.target.getAttribute('data-msg');
        const { dispatch } = this.props;
        dispatch({
            type: 'TOGGLE_TODO',
            payload: {
                id
            }
        });
        message.success(msg);
    }
    // 编辑todo
    editHandle = (e) => {
        this.setState({ 
            isEdit: !this.state.isEdit, 
            editValue: e.target.innerText,
            editId: e.target.getAttribute('data-id')
        });
    }
    // 编辑完成
    editComplete = () => {
        const { dispatch } = this.props;
        let { editId, editValue } = this.state;
        dispatch({
            type: 'EDIT_TODO',
            payload: {
                id: Number(editId),
                text : editValue
            }
        });
        message.success('edit success!');
        this.setState({isEdit: !this.state.isEdit});
    }
    componentDidUpdate(){
        const { todos } = this.props;
        localStorage.save('todos',todos);
    }
    render() {
        let isEdit = this.state.isEdit;
        let todo = this.props.todos.map((item, index) => {
            return (
                <div key={index} className="todo">
                    {item.isComplete ? (
                        <div className="complete">
                            <i data-id={item.id} data-msg="sorry! you have not complete!" onClick={this.toggleHandle}></i>
                            <p data-id={item.id}>{item.text}</p>
                        </div>
                    ) : (
                            <div className="notcomplete">
                                <i data-id={item.id} data-msg="great! you have complete!" onClick={this.toggleHandle}></i>
                                {isEdit ? (
                                    <div>
                                        <p>{item.text}</p>
                                        <Modal
                                            title="edit toto"
                                            visible={this.state.isEdit}
                                            onOk={this.editComplete}
                                            onCancel={this.editHandle}
                                        >
                                            <Form.Item
                                                labelCol={{ span: 5 }}
                                                wrapperCol={{ span: 15 }}
                                                label="todo"
                                            >
                                                <Input data-id={this.state.editId} value={this.state.editValue} onChange={this.changeHandle} />
                                            </Form.Item>
                                        </Modal>
                                    </div>
                                ) : (
                                        <p data-id={item.id} onClick={this.editHandle}>{item.text}</p>
                                    )}

                            </div>
                        )}
                    <span className="time">{item.time}</span>
                    <span className="del" data-id={item.id} onClick={this.delHandle}></span>
                </div>
            )
        })
        return (
            <div className="todos">
                {todo}
            </div>
        );
    }
    changeHandle = (e) => {
        this.setState({editValue: e.target.value});
    }
}

const mapStateToProps = (state) => {
    return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoList);