import { combineReducers } from 'redux';
import localStorage from '../utils/localStorage';

const defaultState = localStorage.fetch('todos');
const todos = (state = defaultState, action) => {
    const  { type, payload} = action;
    switch (type){
        case 'ADD_TODO':
            return [
                {
                    id: payload.id,
                    text: payload.text,
                    isComplete: false,
                    time: payload.time
                },
                ...state
            ]
        case 'DEL_TODO':
            return state.filter(item =>
                item.id !== payload.id
            );
        case 'TOGGLE_TODO':
            return state.map(item => 
                (item.id === payload.id)
                ? {...item, isComplete: !item.isComplete}
                : item
            )
        case 'EDIT_TODO':
            return state.map(item => 
                (item.id === payload.id)
                ? {...item, text: payload.text}
                : item
            )
        case 'DEL_ALL':
            return []
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

export default todoApp