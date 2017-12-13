import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Modal, Form, Input } from 'antd';
import './todoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            editId: '',
            editValue: '',
            editTime: ''
        }
    }
    // 删除todo
    delHandle = (e) => {
        let id = Number(e.target.getAttribute('data-id'));
        const { dispatch, showAll } = this.props;
        dispatch({
            type: 'DEL_TODO',
            payload: {
                id
            }
        });
        message.success('delete success!');
        setTimeout(showAll, 0);
    }
    // 切换todo状态
    toggleHandle = (e) => {
        let id = Number(e.target.getAttribute('data-id'));
        let msg = e.target.getAttribute('data-msg');
        const { dispatch, showFinished, showUnfinished } = this.props;
        dispatch({
            type: 'TOGGLE_TODO',
            payload: {
                id
            }
        });
        message.success(msg);
        setTimeout(msg === 'great! you have complete!' ? showFinished : showUnfinished, 0);
    }
    // 编辑todo
    editHandle = (e) => {
        const _this = this;
        this.setState({
            isEdit: !this.state.isEdit,
            editValue: e.target.innerText,
            editId: e.target.getAttribute('data-id'),
            editTime: _this.getTime(new Date())
        });
    }
    // 编辑完成
    editComplete = () => {
        const { dispatch, showAll } = this.props;
        let { editId, editValue, editTime } = this.state;
        dispatch({
            type: 'EDIT_TODO',
            payload: {
                id: Number(editId),
                text: editValue,
                time: editTime
            }
        });
        message.success('edit success!');
        this.setState({ isEdit: !this.state.isEdit });
        setTimeout(showAll, 0);
    }
    getTime(newDate) {
        let setDate = newDate;
        let year = setDate.getFullYear();
        let month = (setDate.getMonth() + 1) < 10 ? '0' + (setDate.getMonth() + 1) : (setDate.getMonth() + 1);
        let date = setDate.getDate() < 10 ? '0' + setDate.getDate() : setDate.getDate();
        let hour = setDate.getHours() < 10 ? '0' + setDate.getHours() : setDate.getHours();
        let minute = setDate.getMinutes() < 10 ? '0' + setDate.getMinutes() : setDate.getMinutes();
        let second = setDate.getSeconds() < 10 ? '0' + setDate.getSeconds() : setDate.getSeconds();
        let time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        return time;
    }
    render() {
        let isEdit = this.state.isEdit;
        let todo = this.props.todos.map((item, index) => {
            return (
                <div key={index} className="todo">
                    {item.isComplete ? (
                        <div className="complete">
                            <i 
                                data-id={item.id} 
                                data-msg="sorry! you have not complete!" 
                                onClick={this.toggleHandle}
                            ></i>
                            <p data-id={item.id}>{item.text}</p>
                        </div>
                    ) : (
                            <div className="notcomplete">
                                <i 
                                    data-id={item.id} 
                                    data-msg="great! you have complete!" 
                                    onClick={this.toggleHandle}
                                ></i>
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
        this.setState({ editValue: e.target.value });
    }
}

const mapDispatchToProps = ({ dispatch }) => {
    return { dispatch };
}

export default connect(mapDispatchToProps)(TodoList);