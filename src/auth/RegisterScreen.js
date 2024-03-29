import React from 'react'
import './styles/login.css';

export const RegisterScreen = () => {
  return (
    <div className="container login-container">
    

        <div className="col-md-6 login-form-2">
            <h3>Register</h3>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password" 
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password" 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="submit" 
                        className="btnSubmit" 
                        value="Submit" />
                </div>
            </form>
        </div>
  </div>
  )
}
