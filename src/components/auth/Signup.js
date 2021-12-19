import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'

import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui'
import { registerWithEmailPasswordName } from '../../actions/auth';

export const Signup = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui)

    
    const [formValues, handleInputChange ] = useForm({
        name: 'Felix Vega',
        email: 'felixvnolasco@hotmail.com',
        password: '123456',
        password2: '123456'
    });
    
    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, email, password, password2);

        if(isFormValid()) {
            console.log('Formulario correcto');
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch(setError('Name is required!'));
            return false;
        } else if( !validator.isEmail(email) ) {
            dispatch(setError('This is not an email!'))
            return false;
        } else if (password !== password2 || password.length < 5 ) {            
            dispatch(setError('Passwords should be at least 6 characters and should match'))
            return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        <div className='form-inline'>
            <div className='signup-container'>
                <div className="info-container">
                <h2>Journal App</h2>
                    <h4>Write your notes in this app! 📕📖</h4>
                    <p>Organize all the thing you need to do with this app.</p>
                </div>
            </div>

            <div className='form-container'>
                <h4 className="auth__title">Sign In</h4>
                    {
                        (msgError)  && (
                            <div className='auth__alert-error'>
                                {msgError}
                            </div>
                        )
                    }
                <form onSubmit={ handleRegister }>
                    <p className='label'>Name</p>
                    <div className='input-container'>
                        <input className="auth__input" type="text" placeholder="Felix Vega" name="name" autoComplete="off" value={name} onChange={ handleInputChange }/>
                    </div>
                    <p className='label'>Email</p>
                    <div className='input-container'>
                        <input className="auth__input" type="text" placeholder="example@correo.com" name="email" value={email} onChange={ handleInputChange } autoComplete="off"/>
                    </div>
                    <p className='label'>Password</p>
                    <div className='input-container'>
                        <input className="auth__input" type="password" name="password" value={password} onChange={ handleInputChange } />
                        <FaEye className='showHide-icon'/>
                    </div>                
                    <p className='label'>Confirm your password</p>
                    <div className='input-container'>
                        <input className="auth__input" type="password" name="password2" value={password2} onChange={ handleInputChange } />
                    </div>                
                    <div className='btn-container'> 
                        <button className="btn btn-primary" type="submit" onClick={ registerWithEmailPasswordName(email, password, name) }>Sign Up</button>
                    </div>                
                </form>
                <div className='newAccount-container'>
                    <div className="account_title">You already have an account?</div>
                    <Link className="create_account" to="/auth/login">Log in here.</Link>
                </div>         
            </div>
                  
            
        </div>
    )
}
