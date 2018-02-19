import PropTypes from 'prop-types';
import React from 'react';

import Facet from './Facet';
import ActiveFacet from './ActiveFacet';
import { CSSTransitionGroup } from 'react-transition-group';

const FacetList = ({
    facets,
    activeFacetValues,
    status,
    changeFacet,
    applyFacet,
    clearFacet,
}) => {
    return (
        <div className="facet_list">
            <ActiveFacet
                activeFacetValues={activeFacetValues}
                status={status}
                changeFacet={changeFacet}
                applyFacet={applyFacet}
                clearFacet={clearFacet}
            />
            <div className="available_facets">
                <CSSTransitionGroup
                    transitionName="pop"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {facets.map(facet => {
                        return (
                            <Facet
                                key={facet.id}
                                facet={facet}
                                status={status}
                                changeFacet={changeFacet}
                            />
                        );
                    })}
                </CSSTransitionGroup>
            </div>
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.array.isRequired,
    activeFacetValues: PropTypes.array.isRequired,
    status: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired,
    clearFacet: PropTypes.func.isRequired,
};

FacetList.defaultProps = {};

export default FacetList;
