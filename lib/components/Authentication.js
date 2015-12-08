import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import FetchButton from './FetchButton';

class Result extends Component {

    render() {
        const { status, error, onSubmit } = this.props;
        let profile;
        return(
            <div>
                <input
                    ref={node => {
                        this.username = node;
                    }}
                    className="input"
                    type="text" placeholder="login"
                    name="username"
                />
                <select
                    ref={node => {
                        this.profile = node;
                    }}
                >
                    <option selected disabled value="">Choose Profile</option>
                    <option value="vie">vie</option>
                    <option value="shs">shs</option>
                </select>
                <input
                    ref={node => {
                        this.password = node;
                    }}
                    className="input"
                    type="password"
                    placeholder="mot de passe"
                    name="password"
                />
                <FetchButton
                    onClick={() => onSubmit({
                        username: this.username.value,
                        password: this.password.value,
                        profile: this.profile.value
                    })}
                    status={status}
                    error={error}
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
