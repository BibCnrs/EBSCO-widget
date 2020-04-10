import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
} from 'react-bootstrap';
import translate from '../higherOrderComponents/translate';

const FormFavouriteResource = ({ addFavouriteResource, text }) => {
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
        <Form
            inline
            onSubmit={e => {
                addFavouriteResource(e, form);
                document.getElementById('addFormPersonalResource').click();
            }}
        >
            <FormGroup>
                <ControlLabel>{text.form.title} : </ControlLabel>{' '}
                <FormControl
                    type="text"
                    value={form.title}
                    name="title"
                    onChange={handleChange}
                    required="required"
                />{' '}
            </FormGroup>{' '}
            <FormGroup>
                <ControlLabel>{text.form.url} : </ControlLabel>{' '}
                <FormControl
                    type="url"
                    value={form.url}
                    name="url"
                    onChange={handleChange}
                    required="required"
                />{' '}
            </FormGroup>{' '}
            <Button type="submit">Valider</Button>
        </Form>
    );
};

FormFavouriteResource.propTypes = {
    text: PropTypes.object.isRequired,
    addFavouriteResource: PropTypes.func.isRequired,
};

FormFavouriteResource.defaultProps = {
    text: {
        form: {
            title: 'Titre',
            url: 'Url',
        },
    },
};

export default translate(FormFavouriteResource, 'Profile');
