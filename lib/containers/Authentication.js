'use strict';

import React, { Component, PropTypes } from 'react';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    render() {
        const { username, password } = this.state;
        return (
            <form onChange={ e => this.handleChange(e) } onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="username">Login: </label>
                <input type="text" name="username" value={username}/>
                <label htmlFor="password">Mot de passe: </label>
                <input type="password" name="password" value={password}/>
                <button disabled={!username || !password} type="submit" value="soumettre">Soumettre</button>
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
