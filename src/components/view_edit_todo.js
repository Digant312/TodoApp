import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import EditForm from './edit_form';

const renderInput = field => 
    <div >
        {field.type !== 'textarea' ?
        <input 
            className={field.meta.touched && field.meta.error ? "form-control is-invalid" : 'form-control'}
            {...field.input} 
            type={field.type} /> : 
        <textarea 
        className={field.meta.touched && field.meta.error ? "form-control is-invalid" : 'form-control'}
            {...field.input} />  }
        { field.meta.touched && field.meta.error && 
            <div className="invalid-feedback"> {field.meta.error} </div> }
    </div>

class ViewToDo extends Component {
    state = {
        editing: false
    }

    hideForm = () => {
        this.setState({ editing: false});
    }

    renderActiveTaskDetail = (activeTask) => {
        if(this.state.editing){
            return(
                <div>
                    <div>
                    <button className="float-xs-right btn btn-link" onClick={() => this.setState({ editing: false })}>Cancel</button>
                        <EditForm data={activeTask} afterSubmit={this.hideForm.bind(this)}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <button className="btn btn-link" onClick={() => this.setState({ editing: true })}>Edit</button>
                    <p><strong>Title:</strong><br/>{activeTask.title}</p>
                    <p><strong>Description:</strong><br/>{activeTask.description}</p>
                </div>
            )
        }
    }

    render(){
        let activeTask = '';
        if(this.props.activeTodo){
            activeTask = this.props.todos.find(todo => todo.id === this.props.activeTodo);
        }
        return(
            <div className="view-todo col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Selected To Do</h4>
                    </div>
                    <div className="card-body">
                        { activeTask ? this.renderActiveTaskDetail(activeTask) : 
                        <div>Select any task to view details.</div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        todos: state.todos.all,
        activeTodo: state.todos.active
    }
}

export default connect(mapStateToProps, actions)(ViewToDo);