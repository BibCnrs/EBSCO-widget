import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BibButton from './BibButton';
import FetchButton from './FetchButton';
import FacetValue from './FacetValue';
import translate from '../higherOrderComponents/translate';

const ActiveFacet = ({ activeFacetValues, status, text, changeFacet, applyFacet, clearFacet }) => {

    return (
        // <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        //     {

                <div className="active_facet"  key="active_facet">
                    <ButtonGroup
                        justified
                        className="header"
                    >
                        <FetchButton
                            className="title"
                            bsStyle='primary'
                            status={status}
                            icon="search"
                            onClick={applyFacet}
                            label={text.label}
                        />
                        <BibButton
                            className="more"
                            bsStyle='primary'
                            onClick={clearFacet}
                            disabled={activeFacetValues.length === 0}
                            icon={{ name: 'close' }}
                        />
                    </ButtonGroup>
                    <div className="facet_values">
                        {/* <ReactCSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}> */}
                            {
                                activeFacetValues
                                .map((facetValue) => {
                                    return (
                                        <FacetValue
                                            key={facetValue.value}
                                            facetValue={facetValue}
                                            changeFacet={(checked) => changeFacet(facetValue.id, facetValue.value, checked)}
                                        />
                                    );
                                })
                            }
                        {/* </ReactCSSTransitionGroup> */}
                    </div>
                </div>
        //     }
        // </ReactCSSTransitionGroup>
    );
};

ActiveFacet.propTypes = {
    activeFacetValues: PropTypes.array,
    status: PropTypes.string,
    text: PropTypes.object,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired,
    clearFacet: PropTypes.func.isRequired
};

ActiveFacet.defaultProps = {
    text: {
        label: 'Appliquer vos filtres'
    }
};

export default translate(ActiveFacet);
