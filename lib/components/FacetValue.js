import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

const FacetValue = ({ facetValue, changeFacet }) => {
    return (
        <Input
            type="checkbox"
            label={`${facetValue.value}${facetValue.count ? ` (${facetValue.count})` : ''}`}
            checked={!!facetValue.checked}
            onChange={
                (event) => changeFacet(event.target.checked)
            }
        />
    );
};

FacetValue.propTypes = {
    facetValue: PropTypes.object,
    changeFacet: PropTypes.func.isRequired
};

export default FacetValue;
