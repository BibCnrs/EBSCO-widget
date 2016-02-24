import React, { PropTypes } from 'react';

import Select from './Select';

const Facet = ({ facet, id, changeFacet, applyFacet }) => {
    return (
        <Select
            id={id}
            label={facet.label || id}
            value={facet.newValues}
            choices={facet.choices}
            onChange={changeFacet}
            onApply={() => applyFacet(id)}
        />
    );
};

Facet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default Facet;
