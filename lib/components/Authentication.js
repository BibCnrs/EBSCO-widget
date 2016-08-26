import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, Panel } from 'react-bootstrap';

import BibButton from './BibButton';
import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

class Authentication extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }
    render() {
        const {
            username,
            password,
            loginShown,
            status,
            text,
            onSubmit,
            loginRenater,
            hideLogin,
            changeUsername,
            changePassword
        } = this.props;

        return(
            <Modal className="authentication" show={loginShown} onHide={hideLogin}>
                <Modal.Header closeButton>
                    {text.title}
                </Modal.Header>
                <Modal.Body>
                    <p><small>{text.info}</small></p>
                    <BibButton
                        className="janus"
                        block={true}
                        onClick={() => loginRenater()}
                        icon={ status === 'PENDING' ? {name: 'spinner', spin: true } : {name: 'sign-in'} }
                        tooltip={text.janusExplanation}
                        label={text.labintelAccount}
                    />
                <p><a href="https://sesame.cnrs.fr" target="blank">({text.askAccount})</a></p>


                <BibButton
                    className="janus"
                    bsStyle="link"
                    onClick={() => this.setState({ open: !this.state.open })}
                    label={text.inistAccount}
                />
                <Panel
                    className="bibapi"
                    collapsible
                    expanded={this.state.open}
                >
                    <FormControl
                        className="username"
                        value={username}
                        onChange={(e) => changeUsername(e.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' && onSubmit())}
                        type="text"
                        placeholder={text.login}
                        name="username"
                    />
                    <FormControl
                        className="password"
                        value={password}
                        onChange={(e) => changePassword(e.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' && onSubmit())}
                        type="password"
                        placeholder={text.password}
                        name="password"
                    />
                    <FetchButton
                        className="api"
                        block={true}
                        disabled={(!username) || (!password)}
                        onClick={() => onSubmit()}
                        status={status}
                        icon="sign-in"
                        label={text.connection}
                    />
                </Panel>
                </Modal.Body>
                <Modal.Footer><a href="mailto:bibcnrs@inist.fr">{text.contact}</a></Modal.Footer>
            </Modal>
        );
    }
}

Authentication.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loginShown: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    text: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    loginRenater: PropTypes.func.isRequired,
    hideLogin: PropTypes.func.isRequired,
    changeUsername: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};

Authentication.defaultProps = {
    text: {
        login: 'Identifiant',
        password: 'mot de passe',
        connection: 'Connexion',
        title: 'Identifiez vous',
        info: 'La ressource ou le service souhaité est réservé aux ayants droits du CNRS.Pour y accéder il est nécessaire de s\'identifier',
        janus: 'janus',
        labintelAccount: 'Via le gestionnaire d\'identité janus',
        inistAccount: 'Via votre ancien code d\'accés portail',
        contact: 'Nous contacter',
        askAccount: 'demander un compte',
        janusExplanation: 'Compte personnel pour l\'ensemble des services du CNRS Agate, Simbad...'
    }
};

export default translate(Authentication, 'Authentication');
