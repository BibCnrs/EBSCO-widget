import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const frequences = ['year', 'month', 'week', 'day'];

class CreateAlertButton extends Component {
    state = {
        open: false,
        frequence: 'month',
    };

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    onChangeFrequence = event => {
        this.setState({ frequence: event.target.value });
    };

    onSubmit = () => {
        const { frequence } = this.state;
        const { id, createAlert } = this.props;
        createAlert(id, frequence);
        this.setState({ open: false });
    };

    render() {
        const { text } = this.props;
        const { open, frequence } = this.state;

        return (
            <div>
                <BibButton
                    className="create-alert"
                    icon={{ name: 'bell' }}
                    onClick={this.openModal}
                    tooltip={text.createAlert}
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
                                placeholder={text.frequence}
                                name="frequence"
                            >
                                {frequences.map(frequence => (
                                    <option key={frequence} value={frequence}>
                                        {frequence}
                                    </option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <BibButton
                            block={true}
                            onClick={this.onSubmit}
                            status={status}
                            icon={{ name: 'bell' }}
                            label={
                                status === 'SUCCESS'
                                    ? text.saveSuccess
                                    : text.save
                            }
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

CreateAlertButton.propTypes = {
    text: PropTypes.object,
    username: PropTypes.string.isRequired,
    createAlert: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

CreateAlertButton.defaultProps = {
    text: {
        save: 'Enregistrer',
        saveSuccess: 'Alerte enregistrée',
        title: 'Nouvel Alerte',
    },
};

export default translate(CreateAlertButton, 'CreateAlertButton');
