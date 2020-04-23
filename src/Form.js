import React from 'react'

function Form(props){
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors,
        } = props
    
    return (
        <form className='teamForm container'>
            <h2>User Onboarding</h2>

            <div className='errors'>
                <p>{errors.name}</p>
                <p>{errors.email}</p>
                <p>{errors.password}</p>
                <p>{errors.terms}</p>
            </div>

            {/* ////////// TEXT INPUTS ////////// */}
            <label>Name:&nbsp;
            <input

                value={values.name}
                onChange={onInputChange}
                name='name'
                type='text'
            /></label>

            <label>Email:&nbsp;
            <input
            
                value={values.email}
                onChange={onInputChange}
                name='email'
                type='text'
            /></label>

             {/* ////////// PASSWORD ////////// */}
            <label>Password:&nbsp;
            <input
                value={values.password}
                onChange={onInputChange}
                name='password'
                type='password'
            /></label>
    
            {/* ////////// CHECKBOX ////////// */}
      <label><input
        checked={values.terms}
        onChange={onCheckboxChange}
        name='terms'
        type="checkbox" /> Do you agree to the terms and conditions? </label>
    
            {/* submits the form*/}
            <button onClick={onSubmit} disabled={disabled}>submit</button>
        </form>
    )
}

export default Form