import React, { useState } from 'react';
import auth from "./../auth";

/*
export const  LoginForm = props => {    
    return (
        <div>
            <div>
                <h2>Login</h2>                
                <div>                    
                    <button
                        onClick={() => {
                            auth.login(() => {
                                props.history.push("/home");
                            });
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
*/

export  const LoginForm = props => {
    return (
        <Login {...props}/>
    )    
}


export default LoginForm

function Login() {
    const [name, setName] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}; ${password}`);
        auth.login(() => {
            name.props.history.push("/home");
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter your name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter your password:
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </label>
                </div>                
            </form>
            <div>
                <button
                    onClick={() => {
                        auth.login(() => {
                            props.history.push("/home");
                        });
                    }}
                >
                    Login
                </button>
            </div>
        </div>
        
    )
}