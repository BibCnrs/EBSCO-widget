import React, { PropTypes } from 'react';
import Select from 'react-select';

const Facet = ({ facet, changeFacet, id }) => {
    return <div className="facet">
        <label>
            <h5>{facet.label}</h5>
            <Select
                searchable={true}
                options={facet.choices.map((choice, id) => ({
                    value: id,
                    label: `${choice.Value} (${choice.Count})`
                }))}
                value={facet.value}
                onChange={(data) => changeFacet(id, data && data.value, data && facet.choices[data.value].AddAction)}
            />
        </label>
    </div>;
};

Facet.propTypes = {
    facet: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    changeFacet: PropTypes.func.isRequired
};

export default Facet;
