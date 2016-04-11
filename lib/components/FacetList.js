import React, { PropTypes } from 'react';

import Facet from './Facet';
import ActiveFacet from './ActiveFacet';
import translate from '../higherOrderComponents/translate';

const FacetList = ({ facets, activeFacetValues, text, changeFacet, applyFacet, clearFacet }) => {
    return (
        <div className="facet_list">
            <h3>{text.refine}</h3>
            <ActiveFacet
                activeFacetValues={activeFacetValues}
                changeFacet={changeFacet}
                applyFacet={applyFacet}
                clearFacet={clearFacet}
            />
            <div className="available_facets">
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
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.array.isRequired
};

FacetList.defaultProps = {
    text: {
        refine: 'Affiner votre recherche'
    }
};

export default translate(FacetList);
