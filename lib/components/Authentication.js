import React, { Component, PropTypes } from 'react';
import { Modal, Accordion, Input, Panel } from 'react-bootstrap';

import BibButton from './BibButton';
import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Authentication = React.createClass({
    getInitialState: function () {
        return {
            activeKey: 1
        };
    },
    handleSelect: function (activeKey) {
        this.setState({ activeKey });
    },
    componentWillMount: function () {
        this.checkAuth(this.props.token);
    },
    componentWillReceiveProps: function (nextProps) {
        this.checkAuth(nextProps.token);
    },
    checkAuth: function (token) {
        if (token) {
            this.props.goToArticle();
        }
    },
    render: function () {
        const { showLogin, status, url, text, onSubmit, hideLogin } = this.props;
        const { activeKey } = this.state;
        return(
            <Modal show={showLogin} onHide={hideLogin}>
                <Modal.Header closeButton>
                    {text.connection}
                </Modal.Header>
                <Modal.Body>
                <Accordion className="authentication" activeKey={activeKey} onSelect={this.handleSelect}>
                    <Panel className="janus" header={text.labintelAccount} eventKey={1}>
                        <Input wrapperClassName="col-sm-12">
                            <BibButton
                                className="janus"
                                onClick={() => window.location.href=`${url}/login_renater/?origin=${encodeURIComponent(window.location.href)}`}
                                icon={{ name: 'sign-in' }}
                                label={text.janus}
                            />
                        </Input>
                    </Panel>
                    <Panel className="bibapi" header={text.inistAccount} eventKey={2}>
                        <Input
                            className="username"
                            ref={node => {
                                this.username = node && node.refs.input;
                            }}
                            type="text"
                             placeholder={text.login}
                            name="username"
                        />
                        <Input
                            className="password"
                            ref={node => {
                                this.password = node && node.refs.input;
                            }}
                            type="password"
                            placeholder={text.password}
                            name="password"
                        />
                        <FetchButton
                            className="api"
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
                    </Panel>
                </Accordion>
                </Modal.Body>
            </Modal>
        );
    }
});

Authentication.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
};

Authentication.defaultProps = {
    text: {
        login: 'login',
        password: 'mot de passe',
        connection: 'Connexion',
        janus: 'janus',
        labintelAccount: 'Vous avez un compte labintel.',
        inistAccount: 'Vous avez un compte inist.'
    }
};

export default translate(Authentication, 'Authentication');
