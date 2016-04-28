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
                <Input wrapperClassName="col-sm-2">
                    <FetchButton
                        ref={node => {
                            this.fetch = node;
                        }}
                        href={`https://bib-preprod.cnrs.fr/secure/?origin=${encodeURIComponent(window.location.href)}`}
                        onClick={() => window.location.href=`https://bib-preprod.cnrs.fr/secure/?origin=${encodeURIComponent(window.location.href)}`}
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

export default translate(Authentication, 'Authentication');
