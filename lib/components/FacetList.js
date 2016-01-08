import React, { PropTypes } from 'react';
import Facet from '../containers/Facet';

const FacetList = ({ facets }) => (
    <div className="facet_list">
        <h4>Facettes</h4>
        {facets.map((facet, index) => <Facet key={index} facet={facet} />)}
    </div>
);

FacetList.propTypes = {
    records: PropTypes.array.isRequired
};

export default FacetList;
