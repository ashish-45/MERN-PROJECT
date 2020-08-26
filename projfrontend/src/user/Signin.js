import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';

import {signin, authenticate,isAuthenticated} from '../auth/helper';

const Signin = () => {
    const [values, setvalues] = useState({
        email:'jack@gmail.com',
        password:'12345',
        error:'',
        loading:false,
        didRedirect:false
    });

const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setvalues({ ...values, error: false, [name]: event.target.value });
      };

      const onSubmit = event => {
        event.preventDefault();
        setvalues({...values,error:false, loading:true})
        signin({email,password})
        .then(data =>{
            if(data.error){
        setvalues({...values,error:data.error, loading:false})
            } else{
                authenticate(data,()=>{
                    setvalues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch((err) =>{
            console.log('Signin request failed',err);
        })
      }

      const performRedirect = () =>{
        //TO DO A REDIRECT HERE
          if(didRedirect){
              if(user && user.role === 1){
                  return <Redirect to= '/admin/dashboard' />;
              }else{
                  return <Redirect to= '/user/dashboard' />;
              }
          }
          if(isAuthenticated()){
                return <Redirect to ='/' />;             
          }
      }
      const loadingMessage = () => {
          return(
              loading && (
                  <div className='alert alert-info'>
                      <h2>Loading....</h2>
                  </div>
              )
          );
      };
    
        const errorMessage = () =>{
          return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>
           {error}
          </div>
          </div>
          </div>
          );
      };
          

    const SignInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form className='form-group'>
                        <label className='text-light'>Email</label>
                        <input onChange={handleChange('email')} className='form-control' type='email' value={email} />
                    </form>
                    <form className='form-group'>
                        <label className='text-light'>Password</label>
                        <input  onChange={handleChange('password')} className='form-control' type='password' value={password} />
                    </form>
                    <button onClick={onSubmit} className='btn btn-success btn-block'>Submit</button>
                </div>
            </div>
        )
    }
    return (
        <Base title='Sign In page' description='A page user to sign in!'>
            {loadingMessage()}
            {errorMessage()}
            {SignInForm()}
            {performRedirect()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin;