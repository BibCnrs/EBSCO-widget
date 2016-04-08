import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export class Authentication extends Component {

    componentWillMount () {
        this.checkAuth(this.props.token);
    }

    componentWillReceiveProps (nextProps) {
        this.checkAuth(nextProps.token);
    }

    checkAuth (token) {
        if (token) {
            this.props.goToArticle();
        }
    }

    render() {
        const { status, url, text, onSubmit } = this.props;
        return(
            <div>
                <Input wrapperClassName="col-sm-5">
                    <Input
                        ref={node => {
                            this.username = node && node.refs.input;
                        }}
                        type="text"
                         placeholder={text.login}
                        name="username"
                    />
                </Input>
                <Input wrapperClassName="col-sm-5">
                    <Input
                        ref={node => {
                            this.password = node && node.refs.input;
                        }}
                        type="password"
                        placeholder={text.password}
                        name="password"
                    />
                </Input>
                <Input wrapperClassName="col-sm-2">
                    <FetchButton
                        ref={node => {
                            this.fetch = node;
                        }}
                        onClick={() => onSubmit(url, {
                            username: this.username.value,
                            password: this.password.value
                        })}
                        status={status}
                        icon="sign-in"
                        label={text.connection}
                    />
                </Input>
            </div>
        );
    }
}

Authentication.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
};

Authentication.defaultProps = {
    text: {
        login: 'login',
        password: 'mot de passe',
        connection: 'Connexion'
    }
};

export default translate(Authentication);
