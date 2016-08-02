import React, { PropTypes } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BibButton from './BibButton';
import FacetValue from './FacetValue';
import translate from '../higherOrderComponents/translate';

const ActiveFacet = ({ activeFacetValues, text, changeFacet, onSearch, clearFacet }) => {


    return (
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
                !activeFacetValues.length ? (
                    <span key="no-active_facet"/>
                ) : (
                    <div className="active_facet"  key="active_facet">
                        <ButtonGroup
                            justified
                            className="header"
                        >
                            <BibButton
                                className="title"
                                bsStyle='default'
                                onClick={onSearch}
                                label={text.label}
                            />
                            <BibButton
                                className="more"
                                bsStyle='default'
                                onClick={clearFacet}
                                icon={{ name: 'close' }}
                            />
                        </ButtonGroup>
                        <div className="facet_values">
                            <ReactCSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
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
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                )
            }
        </ReactCSSTransitionGroup>
    );
};

ActiveFacet.propTypes = {
    activeFacetValues: PropTypes.array,
    text: PropTypes.object,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired,
    clearFacet: PropTypes.func.isRequired
};

ActiveFacet.defaultProps = {
    text: {
        label: 'Vos filtres'
    }
};

export default translate(ActiveFacet);
