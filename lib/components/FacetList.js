import React, { PropTypes } from 'react';

import Facet from './Facet';

const FacetList = ({ facets, changeFacet, applyFacet }) => {
    return (
        <div className="facet_list">
            {facets.map(facet => {
                return(
                    <Facet
                        key={facet.id}
                        facet={facet}
                        changeFacet={changeFacet}
                        applyFacet={applyFacet}
                    />
                );
            })}
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.array.isRequired
};

export default FacetList;
