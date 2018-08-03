import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TodoFilter extends Component{
    render(){
        return(
            <div className="todo-filter row">
                <ul className="nav nav-tabs nav-fill mb-4">
                    <li className="nav-item">
                        <a onClick={() => this.props.changeFilter('all')} className={this.props.activeFilter === 'all' ? "nav-link active" : "nav-link"}>All</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.props.changeFilter('active')} className={this.props.activeFilter === 'aactive' ? "nav-link active" : "nav-link"}>Active</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.props.changeFilter('completed')} className={this.props.activeFilter === 'completed' ? "nav-link active" : "nav-link"}>Completed</a>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeFilter: state.todos.activeFilter
    }
}
export default connect(mapStateToProps, actions)(TodoFilter);