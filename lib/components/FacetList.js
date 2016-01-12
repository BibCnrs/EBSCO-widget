import React, { PropTypes } from 'react';
import Facet from '../containers/Facet';

const FacetList = ({ facets }) => {
    return (
        <div className="facet_list">
            {Object.keys(facets).map((key) => {
                return(
                    <Facet key={key} id={key} facet={facets[key]} />
                );
            })}
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.object.isRequired
};

export default FacetList;
