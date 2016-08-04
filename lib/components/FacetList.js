import React, { PropTypes } from 'react';

import Facet from './Facet';
import ActiveFacet from './ActiveFacet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FacetList = ({ facets, activeFacetValues, changeFacet, applyFacet, clearFacet }) => {
    return (
        <div className="facet_list">
            <ActiveFacet
                activeFacetValues={activeFacetValues}
                changeFacet={changeFacet}
                applyFacet={applyFacet}
                clearFacet={clearFacet}
            />
            <div className="available_facets">
                <ReactCSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
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
                </ReactCSSTransitionGroup>
            </div>
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.array.isRequired,
    activeFacetValues: PropTypes.array.isRequired,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired,
    clearFacet: PropTypes.func.isRequired
};

FacetList.defaultProps = {
};

export default FacetList;
