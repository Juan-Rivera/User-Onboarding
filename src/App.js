import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import axios from 'axios';

const url = 'https://reqres.in/api/users_';


//form users initial
const initialUsers = [
  {
    name: 'Michael',
    email: 'michael@michael.com',
    password: 'Password123',
    terms: true,
  },
]
//form values initial
const initialFormValues = {
  name: '',
  email: '',
  password: '',
}
//form errors initial
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  terms: '',
}

//creates shape for yup
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('a name is required!'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('email is required'),
  password: yup
    .string()
    .min(6, 'password needs to be 6 characters long')
    .required('password is required'),
  /* terms: yup
  .boolean()
  .oneOf([true], 'You must accept Terms and Conditions')
   */
})


function App() {
  //use states\\
  //Users useState
  const [users, setUsers] = useState(initialUsers)
  //Form Values useState
  const [formValues, setFormValues] = useState(initialFormValues);
  //Form Disabled useState
  const [formDisabled, setFormDisabled] = useState(true)
  //Form Errors useState
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  //
  const [post, setPost] = useState([]);

  //this useEffect checks if the formSchema has the correct info for the form to be enabled 
  //if not it will not enable
  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => { // either true or false
        setFormDisabled(!valid)
      })
  }, [formValues])
  
  const postUser = user => {
    axios.post(url, user)
      .then(res => {
        setPost([...users, res.data])
      })
      .catch(err => {
        debugger
      })

  }


  //whenever a user inputs a change in the form the form will save the data of the user 
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    //validates the form and checks for any errors
    yup
    //reaches the target name
    .reach(formSchema, name)
    //validates the value
    .validate(value)
    //if passed...
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: '',
      })
    })
    //if an error is caught...
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })

    setFormValues({...formValues, [name]: value},)
  }
  //whenever a checkbox changes it will then save that data from the user
  const onCheckboxChange = evt => {
    const name  = evt.target
    const isChecked = evt.target.checked
    
    setFormValues({
      ...formValues.name,
        [name]: isChecked,
    })
    
  }
  //when there is a submission, the form submission will be saved in the react component
  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    }
    setUsers([ ...users, newUser ])

    postUser(newUser)
    setFormValues(initialFormValues)
  }
  return (
    <div className='container'>
      <header><h1>User App</h1></header>
      <Form 
      values={formValues}
      onInputChange={onInputChange}
      onCheckboxChange={onCheckboxChange}
      onSubmit={onSubmit}
      disabled={formDisabled}
      errors={formErrors}
      />
      {/* renders the data on screen */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}

export default App;
