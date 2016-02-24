import React, { PropTypes } from 'react';

import Facet from './Facet';

const FacetList = ({ facets, changeFacet, applyFacet }) => {
    return (
        <div className="facet_list">
            {Object.keys(facets).map((key) => {
                return(
                    <Facet
                        key={key}
                        id={key}
                        facet={facets[key]}
                        changeFacet={changeFacet}
                        applyFacet={applyFacet}
                    />
                );
            })}
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.object.isRequired
};

export default FacetList;
