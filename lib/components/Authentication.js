import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import BibButton from './BibButton';
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
        const { url, text } = this.props;
        return(
            <div>
                <Input wrapperClassName="col-sm-2">
                    <BibButton
                        onClick={() => window.location.href=`${url}/login/?origin=${encodeURIComponent(window.location.href)}`}
                        icon={{ name: 'sign-in' }}
                        label={text.connection}
                    />
                </Input>
            </div>
        );
    }
}

Authentication.propTypes = {
    status: PropTypes.string.isRequired
};

Authentication.defaultProps = {
    text: {
        connection: 'Connexion'
    }
};

export default translate(Authentication, 'Authentication');
