import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm } from 'antd';
import localStorage from '../utils/localStorage';
import './addTodo.css';

let nextId = 0;

class AddTodo extends Component{
    constructor(props){
        super(props);
        this.state={
            inputValue: ''
        }
    }
    // 添加todo
    addTodo = (e) => {
        const text = this.state.inputValue;
        const time = this.getTime(new Date());
        const { dispatch } = this.props;
        if(text !== ''){
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    id: nextId++,
                    text,
                    time
                }
            });
            message.success('add success!');
            this.setState({inputValue: ''});
        }else{
            message.warning('please input content!');
        }
    }
    // 删除全部
    delALl = () => {
        const { dispatch } = this.props;
        if(this.props.todos.length>0){
            dispatch({
                type: 'DEL_ALL'
            });
            message.success('delete all success');
            localStorage.remove('todos');
        }else{
            message.error('nothing can be deleted!');
        }
    }
    componentDidMount(){ 
        // 回车添加
        let _this=this;
        document.addEventListener('keyup',function(e){
            if(e.keyCode===13){
                _this.addTodo()
            }
        })
    }
    componentDidUpdate(){
        const { todos } = this.props;
        localStorage.save('todos',todos);
    }
    render(){
        const { inputValue } = this.state;
        return (
            <div className="todoContentHead">
                <input type="text" placeholder="something to do..." value={inputValue} onChange={this.changeHandle} />
                <span className="add" onClick={this.addTodo}></span>
                <Popconfirm title={`Are you sure delete all?`} onConfirm={this.delALl}>
                    <span className="delAll"></span>
                </Popconfirm>
            </div>
        );
    }
    changeHandle = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    getTime(newDate){
        let setDate=newDate;
        let year=setDate.getFullYear();
        let month=(setDate.getMonth()+1)<10?'0'+(setDate.getMonth()+1):(setDate.getMonth()+1);
        let date=setDate.getDate()<10?'0'+setDate.getDate():setDate.getDate();
        let hour=setDate.getHours()<10?'0'+setDate.getHours():setDate.getHours();
        let minute=setDate.getMinutes()<10?'0'+setDate.getMinutes():setDate.getMinutes();
        let second=setDate.getSeconds()<10?'0'+setDate.getSeconds():setDate.getSeconds();
        let time=`${year}-${month}-${date} ${hour}:${minute}:${second}`;
        return time;
    }
}

const mapStateToProps = (state) => {
    return {todos: state.todos};
}

export default connect(mapStateToProps)(AddTodo);