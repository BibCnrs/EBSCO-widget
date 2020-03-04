import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'react-bootstrap';

const FacetValue = ({ facetValue, changeFacet }) => {
    return (
        <Checkbox
            className="facet_value"
            checked={!!facetValue.checked}
            onChange={event => {
                changeFacet(event.target.checked);
                const searchButton = document.querySelector('.searchFacet');
                if (searchButton) {
                    searchButton.click();
                }
            }}
        >{`${facetValue.value}${
            facetValue.count ? ` (${facetValue.count})` : ''
        }`}</Checkbox>
    );
};

FacetValue.propTypes = {
    facetValue: PropTypes.object,
    changeFacet: PropTypes.func.isRequired,
};

export default FacetValue;
