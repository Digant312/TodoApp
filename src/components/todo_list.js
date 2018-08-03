import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoFilter from './todo_filter';

class ToDoList extends Component{

    componentWillMount(){
        if(this.props.todos.length > 0){
            this.props.setActiveToDo(this.props.todos[0].id);
        }
    }

    renderFilteredTodos = (activeFilter) => {
        let todosToShow = [];
        if(activeFilter === 'active'){
            todosToShow = this.props.todos.filter( todo => !todo.completed )
        } else if(activeFilter === 'completed'){
            todosToShow = this.props.todos.filter( todo => todo.completed )
        } else {
            console.log('Show all posts')
            todosToShow = this.props.todos;
        }
        return todosToShow.map( todo => this.renderTodo(todo) );
    }

    renderTodo = (todo) => {
        let className = 'list-group-item list-group-item-action';
        if(this.props.activeTodo === todo.id){
            className += ' active';
        }
        return (
            <li className={className} key={todo.id} style={styles.listItemStyle}>
                <div onClick={() => this.props.setActiveToDo(todo.id)}>
                    <span className={todo.completed ? "dot dot-sm dot-success" : "dot dot-sm dot-warning"}></span>
                    {todo.title}
                </div>
                <button 
                    className="close float-xs-right" 
                    style={styles.buttonStyle}
                    onClick={() => this.props.deleteToDo(todo.id)} >
                    &times;
                </button>
            </li>
        )
    }

    render(){
        return(
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">All To Dos...</h4>
                    </div>
                    <div className="card-body">
                        <TodoFilter />
                        <ul className="list-group">
                            {this.renderFilteredTodos(this.props.activeFilter)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    listItemStyle: {
        position: 'relative'
    },
    buttonStyle : {
        position : 'absolute',
        right: 0,
        top:0,
        width: '36px',
        textAlign: 'center',
        lineHeight: '50px'
    }
}

function mapStateToProps(state){
    return {
        todos: state.todos.all,
        activeTodo: state.todos.active,
        activeFilter: state.todos.activeFilter
    }
}

export default connect(mapStateToProps, actions)(ToDoList);