'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from '../components/FetchButton';

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
            <form>
                <label htmlFor="username">Login: </label>
                <input onChange={ e => this.handleChange(e) } type="text" ref="username" name="username" value={username}/>
                <label htmlFor="password">Mot de passe: </label>
                <input onChange={ e => this.handleChange(e) } type="password" ref="password" name="password" value={password}/>
                <FetchButton
                    onClick={(e) => this.handleSubmit(e)}
                    status={status}
                    error={error}
                    icon="sign-in"
                    label="Connexion"
                />
            </form>
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
        this.props.onSubmit(this.state);
    }
}

Result.propTypes = {
};
