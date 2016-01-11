import React, { PropTypes } from 'react';
import Select from 'react-select';

const Facet = ({ facet, id, changeFacet }) => {
    return <div className="facet">
        <label>
            <h5>{facet.label}</h5>
            <Select
                multi={true}
                value={facet.values}
                searchable={true}
                clearable={true}
                options={facet.choices}
                onChange={(data) => {
                    return changeFacet(id, data || []);
                }}
            />
        </label>
    </div>;
};

Facet.propTypes = {
    facet: PropTypes.object.isRequired,
    changeFacet: PropTypes.func.isRequired
};

export default Facet;
