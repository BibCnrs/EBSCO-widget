import React, { PropTypes } from 'react';

import Facet from './Facet';
import ActiveFacet from './ActiveFacet';

const FacetList = ({ facets, activeFacetValues, changeFacet, applyFacet, clearFacet }) => {
    return (
        <div className="facet_list">
            <h3>Affiner</h3>
            <ActiveFacet
                activeFacetValues={activeFacetValues}
                changeFacet={changeFacet}
                applyFacet={applyFacet}
                clearFacet={clearFacet}
            />
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
