import React, { PropTypes } from 'react';

import SelectButton from './SelectButton';

const FieldSelector = ({ field, availableFields, onChangeField }) => {
    return (
        <SelectButton
            pullLeft
            value={field}
            choices={availableFields}
            onChange={onChangeField}
        />
    );
};

FieldSelector.propTypes = {
    field: PropTypes.string,
    availableFields: PropTypes.array.isRequired,
    onChangeField: PropTypes.func.isRequired
};

export default FieldSelector;
