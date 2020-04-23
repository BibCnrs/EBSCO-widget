import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const frequences = ['day', 'week', 'month', 'disableAlert'];

const parseFrequence = frequence => (!frequence ? 'week' : frequence);

class AlertButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            frequence: parseFrequence(props.frequence),
        };
    }

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    onChangeFrequence = event => {
        this.setState({ frequence: event.target.value });
    };

    onSave = () => {
        const { frequence } = this.state;
        const { id, saveAlert, disableAlert } = this.props;
        if (frequence === 'disableAlert') {
            disableAlert(id);
            this.closeModal();
            return;
        }
        saveAlert(id, frequence);
        this.closeModal();
    };

    UNSAFE_componentWillReceiveProps({ frequence }) {
        this.setState({ frequence: parseFrequence(frequence) });
    }

    render() {
        const { alertExists, text, active } = this.props;
        const { open, frequence } = this.state;

        const label =
            active === true
                ? alertExists
                    ? text[this.props.frequence]
                    : ''
                : alertExists
                ? text.disabled
                : '';

        return (
            <span>
                <BibButton
                    className="create-alert"
                    icon={{ name: 'bell' }}
                    onClick={this.openModal}
                    label={label}
                    tooltip={alertExists ? text.editAlert : text.createAlert}
                />
                <Modal show={open} onHide={this.closeModal}>
                    <Modal.Header closeButton>{text.title}</Modal.Header>
                    <Modal.Body className="alert-creation">
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>{text.frequence}</ControlLabel>
                            <FormControl
                                className="frequence"
                                value={frequence}
                                onChange={this.onChangeFrequence}
                                componentClass="select"
                                name="frequence"
                            >
                                {frequences.map(frequence => (
                                    <option key={frequence} value={frequence}>
                                        {text[frequence]}
                                    </option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <BibButton
                            block={true}
                            onClick={this.onSave}
                            status={status}
                            icon={{ name: 'check' }}
                            label={text.save}
                        />
                    </Modal.Body>
                </Modal>
            </span>
        );
    }
}

AlertButton.propTypes = {
    text: PropTypes.object,
    username: PropTypes.string,
    alertExists: PropTypes.bool.isRequired,
    saveAlert: PropTypes.func.isRequired,
    disableAlert: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    frequence: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
};

AlertButton.defaultProps = {
    text: {
        save: 'Enregistrer',
        title: 'Réglages Alerte',
        month: 'Mensuelle',
        week: 'Hebdomadaire',
        day: 'Quotidienne',
        none: 'Jamais',
        createAlert: 'Créer une alerte',
        editAlert: `Modifier l'alerte`,
        disableAlert: 'Désactiver/réactiver une alerte',
    },
};

export default translate(AlertButton, 'AlertButton');
