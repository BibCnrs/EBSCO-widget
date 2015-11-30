'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    render() {
        const { status, error } = this.props.login;
        const { username, password } = this.state;
        return (
            <div>
                <input
                    ref="username"
                    className="input"
                    onChange={ e => this.handleChange(e) }
                    type="text" placeholder="login"
                    name="username"
                    value={username}
                />
                <input
                    ref="password"
                    className="input"
                    onChange={ e => this.handleChange(e) }
                    type="password"
                    placeholder="mot de passe"
                    name="password"
                    value={password}
                />
                <FetchButton
                    onClick={(e) => this.handleSubmit(e)}
                    status={status}
                    error={error}
                    icon="sign-in"
                    label="Connexion"
                    disabled={!username || !password}
                />
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.url, this.state);
    }
}

Result.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
};
