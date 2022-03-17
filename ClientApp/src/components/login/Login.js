import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import './Login.css';


export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { events: [], username: "", password: "", error: false };
    }

    componentDidMount() {

    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        
        const response = await fetch('api/account/login', requestOptions)
        const data = await response.json();

        if (response.status === 200 && data.message !== undefined)
        {
            this.setState({error: data.message});
        } else if (response.status === 200) {
            this.props.history.push("");
        }
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </Form.Group>
                    {this.state.error && <label>Username or Password is wrong</label>} 
                    <button className='Login-Button' block size="lg" type="submit" disabled={!this.validateForm()}>
                        Login
                    </button>
                </Form>
            </div>
        );
    }
}
