import React, { PropTypes } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BibButton from './BibButton';
import FacetValue from './FacetValue';
import translate from '../higherOrderComponents/translate';

const ActiveFacet = ({ activeFacetValues, text, changeFacet, applyFacet, clearFacet }) => {
    if (!activeFacetValues.length) {
        return <span/>;
    }

    return (
        <div className="active_facet">
            <ButtonGroup
                justified
                className="header"
            >
                <BibButton
                    className="title"
                    bsStyle='default'
                    onClick={applyFacet}
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
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        activeFacetValues
                        .map((facetValue, index) => {
                            return (
                                <FacetValue
                                    key={index}
                                    facetValue={facetValue}
                                    changeFacet={(checked) => changeFacet(facetValue.id, facetValue.value, checked)}
                                />
                            );
                        })
                    }
                </ReactCSSTransitionGroup>
            </div>
        </div>
    );
};

ActiveFacet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

ActiveFacet.defaultProps = {
    text: {
        label: 'Vos filtres'
    }
};

export default translate(ActiveFacet);
