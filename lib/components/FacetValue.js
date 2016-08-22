import React, { PropTypes } from 'react';
import { Checkbox } from 'react-bootstrap';

const FacetValue = ({ facetValue, changeFacet }) => {
    return (
        <Checkbox
            className="facet_value"
            checked={!!facetValue.checked}
            onChange={
                (event) => changeFacet(event.target.checked)
            }
        >{`${facetValue.value}${facetValue.count ? ` (${facetValue.count})` : ''}`}</Checkbox>
    );
};

FacetValue.propTypes = {
    facetValue: PropTypes.object,
    changeFacet: PropTypes.func.isRequired
};

export default FacetValue;
