import React, { PropTypes } from 'react';
import Select from './Select';

const Facet = ({ facet, id, changeFacet, applyFacet }) => {
    return (
        <Select
            id={id}
            label={facet.label}
            values={facet.newValues}
            choices={facet.choices}
            changeValue={changeFacet}
            applyValue={applyFacet}
        />
    );
};
Facet.propTypes = {
    // facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default Facet;
