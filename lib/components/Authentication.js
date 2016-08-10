import React, { Component, PropTypes } from 'react';
import { Modal, Accordion, Input, Panel } from 'react-bootstrap';

import BibButton from './BibButton';
import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Authentication = ({ username, password, mode, loginShown, status, text, onSubmit, loginRenater, hideLogin, changeUsername, changePassword, changeMode }) => {
    return(
        <Modal className="authentication" show={loginShown} onHide={hideLogin}>
            <Modal.Header closeButton>
                {text.connection}
            </Modal.Header>
            <Modal.Body>
            <Accordion className="authentication" activeKey={mode} onSelect={changeMode}>
                <Panel className="janus" header={text.labintelAccount} eventKey="labintel">
                    <Input wrapperClassName="col-sm-12">
                        <BibButton
                            className="janus"
                            onClick={() => loginRenater()}
                            icon={{ name: 'sign-in' }}
                            label={text.janus}
                        />
                    </Input>
                </Panel>
                <Panel className="bibapi" header={text.inistAccount} eventKey="inist">
                    <Input
                        className="username"
                        value={username}
                        onChange={(e) => changeUsername(e.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' && onSubmit())}
                        type="text"
                        placeholder={text.login}
                        name="username"
                    />
                    <Input
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
                        disabled={(!username) || (!password)}
                        onClick={() => onSubmit()}
                        status={status}
                        icon="sign-in"
                        label={text.connection}
                    />
                </Panel>
            </Accordion>
            </Modal.Body>
            <Modal.Footer><a href="mailto:bibcnrs@inist.fr">{text.contact}</a></Modal.Footer>
        </Modal>
    );
};

Authentication.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    loginShown: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    text: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    loginRenater: PropTypes.func.isRequired,
    hideLogin: PropTypes.func.isRequired,
    changeUsername: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired
};

Authentication.defaultProps = {
    text: {
        login: 'login',
        password: 'mot de passe',
        connection: 'Connexion',
        janus: 'janus',
        labintelAccount: 'Vous avez un compte labintel.',
        inistAccount: 'Vous avez un compte inist.',
        contact: 'Nous contacter'
    }
};

export default translate(Authentication, 'Authentication');
