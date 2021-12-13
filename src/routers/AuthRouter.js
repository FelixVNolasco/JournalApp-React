
import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Login } from '../components/auth/Login';
import { Signup } from '../components/auth/Signup';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
            <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/signup" component={Signup} />
                <Redirect to="/auth/login" />
            </Switch>
            </div>
        </div>
    )
}
