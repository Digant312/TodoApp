import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
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

// To Clear form-data after submission
const afterSubmit = (result, dispatch) => {
    return dispatch(reset('addTodo'));
}  

class AddToDo extends Component{

    onSubmit = ({ title, description }) => {
        const newTodo = {
            id: uuid(),
            title,
            description,
            completed: false
        }
        this.props.addToDo(newTodo);
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <div className="add_todo col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Add a new To Do</h4>
                    </div>
                    <form className="card-body" onSubmit={handleSubmit(this.onSubmit)}>
                        <div className="form-group">
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
                        <button type="submit" className="btn btn-primary">Create</button>                    
                    </form>
                </div>
            </div>
        )
    }
}

const formProps = {
    form: 'addTodo',
    fields: ['title', 'description'],
    validate,
    onSubmitSuccess: afterSubmit
}

function uuid() {
    let random;
    let uuid = '';

    for (let i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return uuid;
}

function validate(formData){
    const errors = {};

    if(!formData.title){
        errors.title = "Title is compulsory."
    }
    if(!formData.description){
        errors.description = "Description is compulsory."
    }
    return errors;
}

function mapStateToProps(state){
    return {
        todos: state.todos.all
    }
}

export default connect(mapStateToProps, actions)(reduxForm(formProps)(AddToDo));