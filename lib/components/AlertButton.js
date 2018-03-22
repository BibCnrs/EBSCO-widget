import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const frequences = ['none', 'year', 'month', 'week', 'day'];

class AlertButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            frequence: props.frequence,
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
        const { id, saveAlert, removeAlert, alertExists } = this.props;
        if (frequence === 'none' && !alertExists) {
            this.closeModal();
            return;
        }
        if (frequence === 'none') {
            removeAlert(id);
            this.closeModal();
            return;
        }
        saveAlert(id, frequence);
        this.closeModal();
    };

    componentWillReceiveProps({ frequence }) {
        this.setState({ frequence });
    }

    render() {
        const { alertExists, text } = this.props;
        const { open, frequence } = this.state;

        return (
            <div>
                <BibButton
                    className="create-alert"
                    bsStyle={alertExists ? 'success' : 'primary'}
                    icon={{ name: 'bell' }}
                    onClick={this.openModal}
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
            </div>
        );
    }
}

AlertButton.propTypes = {
    text: PropTypes.object,
    username: PropTypes.string.isRequired,
    alertExists: PropTypes.bool.isRequired,
    saveAlert: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    frequence: PropTypes.string.isRequired,
};

AlertButton.defaultProps = {
    text: {
        save: 'Enregistrer',
        title: 'Réglages Alerte',
        year: 'tous les ans',
        month: 'tous les mois',
        week: 'toutes les semaines',
        day: 'tous les jours',
        none: 'jamais',
        createAlert: 'Créer une alerte',
        editAlert: `Modifier l'alerte`,
    },
};

export default translate(AlertButton, 'AlertButton');