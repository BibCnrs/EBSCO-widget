import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

class Result extends Component {

    render() {
        const { status, error, onSubmit } = this.props;
        return(
            <div>
                <input
                    ref={node => {
                        this.username = node;
                    }}
                    className="input username"
                    type="text" placeholder="login"
                    name="username"
                />
                <input
                    ref={node => {
                        this.password = node;
                    }}
                    className="input password"
                    type="password"
                    placeholder="mot de passe"
                    name="password"
                />
                <FetchButton
                    ref={node => {
                        this.fetch = node;
                    }}
                    onClick={() => onSubmit({
                        username: this.username.value,
                        password: this.password.value
                    })}
                    status={status}
                    icon="sign-in"
                    label="Connexion"
                />
            </div>
        );
    }
}

Result.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string
};

export default Result;
