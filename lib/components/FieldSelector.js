import React, { PropTypes } from 'react';

import SelectButton from './SelectButton';

const fieldLabel= {
    [null]: 'Tout',
    TX: 'Texte',
    AU: 'Auteur',
    TI: 'Titre',
    SU: 'Sujet',
    SO: 'Source',
    AB: 'Résumé',
    IS: 'ISSN',
    IB: 'ISBN',
    PT: 'Resource',
    PB: 'Editeur'
};

const FieldSelector = ({ field, availableField, onChangeField }) => {
    return (
        <SelectButton
            pullLeft
            value={fieldLabel[field]}
            choices={availableField}
            onChange={onChangeField}
        />
    );
};

FieldSelector.propTypes = {
    field: PropTypes.string,
    availableField: PropTypes.array.isRequired,
    onChangeField: PropTypes.func.isRequired
};

export default FieldSelector;
