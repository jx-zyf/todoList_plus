import React, { Component } from 'react'

import './todoHeader.css'

class TodoHeader extends Component {
    render() {
        return (
            <header>
                <h1 className="title">TodoList</h1>
                <div className="date">
                    <span className="day">{this.getDate(new Date()).day} - </span>
                    <span className="month">{this.getDate(new Date()).month} - </span>
                    <span className="year">{this.getDate(new Date()).year}</span>
                </div>
                <h2>{this.getDate(new Date()).week}</h2>
            </header>
        )
    }
    getDate(newDate) {
        let setDate = newDate;
        let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let weekArray = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
        let dateObj = {
            year: setDate.getFullYear(),
            month: monthArray[setDate.getMonth()],
            day: setDate.getDate() < 10 ? '0' + setDate.getDate() : setDate.getDate(),
            week: weekArray[setDate.getDay()]
        }
        return dateObj;
    }
}

export default TodoHeader