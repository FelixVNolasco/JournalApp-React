import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmailPassword, startGoogleLogin } from '../../actions/auth'

export const Login = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const [showPassword, setshowPassword] = useState(false);


    const handleShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const [formValues, handleInputChange ] = useForm({
        email: 'felixvnolasco@hotmail.com',
        password: 123456
    });

    const {email, password} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginWithEmailPassword(email, password));
    }

    const handleGoogleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(startGoogleLogin())
    }

    return (
        <div className='form-inline animate__animated animate__fadeIn'>

            <div className='login-container'>
                <div className="info-container">
                <h2>Journal App</h2>                    
                    <h4>You can create a new account right here!</h4>                   
                </div>
            </div>

            <div className='form-container '>
                <h4 className="auth__title">Signup</h4>
                <form onSubmit={ handleSubmit }>
                    <p className='label'>Email</p>
                    <div className='input-container'>
                        <input className="auth__input" type="text" placeholder="example@correo.com" name="email" autoComplete="off" value={email} onChange={handleInputChange}/>
                    </div>                
                    <p className='label'>Password</p>
                    <div className='input-container'>
                        <input className="auth__input" type={showPassword ? "text" : "password"} placeholder="" name="password" value={password} onChange={handleInputChange}/>
                        <FaEye className='showHide-icon' onClick={ handleShowPassword }/>
                    </div>
                    
                    <div className='btn-container'> 
                        <button className="btn btn-primary" type="submit" disabled={loading}>Sign In</button>
                    </div>                
                </form>
                <div className='optionContainer'>
                    <p>Or you can login with:</p>
                </div>
                <div className="auth_social-networks">
                    <div className="google-btn" onClick={ handleGoogleLoginSubmit }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                    </div>
                    <div className='newAccount-container'>
                        <div className="account_title">You don't have an account?</div>
                        <Link className="create_account" to="/auth/signup">Create a new one here.</Link>
                    </div>                
                </div>
            </div>

           
        </div>
    )
}
