import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';



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

const renderCheckbox = field =>
    <div>
        {field.type === 'checkbox' ?
            <input 
            className="form-control"
            {...field.input} 
            type={field.type} />
        : ''}
    </div>

class EditForm extends Component{
    state = {
        completed : this.props.data.completed
    }

    componentWillReceiveProps(nextProps){
        if(this.props.data.id !== nextProps.data.id){
            this.setState({ completed: nextProps.data.completed });
        }
    }

    onSubmit = ({ title, description, completed }) => {
        const newTodo = {
            id: this.props.data.id,
            title,
            description,
            completed
        }
        this.props.updateToDo(newTodo);
        this.props.afterSubmit();
    }

    toggleCurrent = (event) => {
        console.log('State changed');
        this.setState((prevState) => {
            // Important: read `prevState` instead of `this.state` when updating.
            return {completed: !prevState.completed}
        });
    }
    
    render(){
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        console.log(this.state.completed)
        return(
            <form className="card-body" onSubmit={handleSubmit(this.onSubmit)}>
                <strong>Status: {this.state.completed ? "Completed" : "Pending"}</strong>
                <div className="form-group" >
                    <label>Title</label>
                    <Field 
                        name="title"   
                        component={renderInput} 
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <Field 
                        name="description"   
                        component={renderInput}
                        type="textarea"
                    />
                </div>
                <div className="form-group">
                    <label>Completed ?</label>
                    <Field 
                        name="completed" 
                        component={renderCheckbox}
                        type="checkbox"
                        onChange={this.toggleCurrent.bind(this)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-danger" onClick={() => this.props.deleteToDo(this.props.data.id)}>Delete</button>
            </form>
        )
    }
}

const formProps = {
    form: 'editTodo',
    fields: ['title', 'description', 'completed'],
    enableReinitialize: true
}

function mapStateToProps(state, ownProps){
    return {
        initialValues: ownProps.data
    }
}

export default connect(mapStateToProps, actions)(reduxForm(formProps)(EditForm));