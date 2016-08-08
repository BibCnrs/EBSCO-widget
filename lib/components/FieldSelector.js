import React, { PropTypes } from 'react';

import SelectButton from './SelectButton';
import translate from  '../higherOrderComponents/translate';

const FieldSelector = ({ field, availableFields, text, onChangeField }) => {
    const fieldLabel = {
        [null]: text.all,
        AU: text.author,
        AR: text.exactAuthor,
        TI: text.title,
        SU: text.subject,
        S0: text.source,
        AB: text.abstract,
        IS: 'ISSN',
        IB: 'ISBN',
        PB: text.publisher
    };

    return (
        <SelectButton
            value={fieldLabel[field] || field}
            choices={availableFields.map(value => ({value, label: fieldLabel[value] || value }))}
            onChange={onChangeField}
        />
    );
};

FieldSelector.propTypes = {
    field: PropTypes.string,
    availableFields: PropTypes.array.isRequired,
    text: PropTypes.object,
    onChangeField: PropTypes.func.isRequired
};

FieldSelector.defaultProps = {
    text: {
        all: 'Tout',
        author: 'Auteur',
        exactAuthor: 'Auteur exact',
        title: 'Titre',
        subject: 'Sujet',
        source: 'Source',
        abstract: 'Résumé',
        publisher: 'Editeur'
    }
};

export default translate(FieldSelector);
