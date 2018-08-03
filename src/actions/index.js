import { ADD_TODO, EDIT_TODO, SET_ACTIVE, DELETE_TODO, UPDATE_TODO, CHANGE_FILTER } from './types';

export function addToDo(todo){
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export function setActiveToDo(id){
    return {
        type: SET_ACTIVE,
        payload: id
    }
}

export function deleteToDo(id){
    return{ 
        type: DELETE_TODO,
        payload: id
    }
}

export function updateToDo(todo){
    return { 
        type: UPDATE_TODO,
        payload: todo
    }
}

export function changeFilter(tab){
    return {
        type : CHANGE_FILTER,
        payload: tab
    }
}