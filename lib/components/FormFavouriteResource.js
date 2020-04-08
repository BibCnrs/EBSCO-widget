import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
} from 'react-bootstrap';

export const FormFavouriteResource = ({ addFavouriteResource }) => {
    const [form, setForm] = useState({
        url: '',
        title: '',
    });

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Form inline onSubmit={e => addFavouriteResource(e, form)}>
            <FormGroup>
                <ControlLabel>Titre : </ControlLabel>{' '}
                <FormControl
                    type="text"
                    value={form.title}
                    name="title"
                    onChange={handleChange}
                />{' '}
            </FormGroup>{' '}
            <FormGroup>
                <ControlLabel>Url : </ControlLabel>{' '}
                <FormControl
                    type="url"
                    value={form.url}
                    name="url"
                    onChange={handleChange}
                />{' '}
            </FormGroup>{' '}
            <Button type="submit">Valider</Button>
        </Form>
    );
};

FormFavouriteResource.propTypes = {
    addFavouriteResource: PropTypes.func.isRequired,
};
