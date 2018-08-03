import { SET_ACTIVE, ADD_TODO, DELETE_TODO, UPDATE_TODO, CHANGE_FILTER } from '../actions/types';

const initialValue = {
    all: [{
        id: '123',
        title: 'demo',
        description: 'demo 123...',
        completed: true
    },
    {
        id: '345',
        title: 'demo 123',
        description: 'demo 123 sometthing new...',
        completed: false
    }],
    active: '',
    activeFilter: 'all'
}

export default function(state = initialValue, action){
    switch(action.type){
        case ADD_TODO:
            return {...state, all: [action.payload, ...state.all] }
        case SET_ACTIVE:
            return {...state, active: action.payload }
        case DELETE_TODO:
            if( state.active === action.payload){
                return {...state, active:'', all: state.all.filter( todo => todo.id !== action.payload)}
            } else {
                return {...state, all: state.all.filter( todo => todo.id !== action.payload)};
            }
        case UPDATE_TODO:
            const updatedTodos = state.all.map(todo => todo.id === action.payload.id ? action.payload : todo);
            return { ...state, all: updatedTodos }
        case CHANGE_FILTER:
            return {...state, activeFilter: action.payload}
        default:
            return state;
    }
}