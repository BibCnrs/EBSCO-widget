import React, { PropTypes } from 'react';
import Select from 'react-select';

const Facet = ({ facet, changeFacet }) => {
    return <div className="facet">
        <label>
            <h5>{facet.Label}</h5>
            <Select
                searchable={true}
                options={facet.AvailableFacetValues.map((facetValue) => ({
                    value: facetValue.AddAction,
                    label: `${facetValue.Value} (${facetValue.Count})`
                }))}
                value={null}
                onChange={(data) => changeFacet(facet.Id, data && data.value)}
            />
        </label>
    </div>;
};

Facet.propTypes = {
    facet: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    changeFacet: PropTypes.func.isRequired
};

export default Facet;
