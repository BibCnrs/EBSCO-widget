import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';

import BibButton from './BibButton';
import FetchButton from './FetchButton';
import FacetValue from './FacetValue';
import translate from '../higherOrderComponents/translate';

const ActiveFacet = ({
    activeFacetValues,
    status,
    text,
    changeFacet,
    applyFacet,
    clearFacet,
}) => {
    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            {
                <div className="active_facet" key="active_facet">
                    <FetchButton
                        className="title searchFacet hidden"
                        bsStyle="primary"
                        status={status}
                        icon="search"
                        onClick={applyFacet}
                        label={text.label}
                    />
                    <ButtonGroup justified className="header">
                        <FetchButton
                            className="title clearFacet"
                            bsStyle="primary"
                            status={status}
                            icon="search"
                            onClick={clearFacet}
                            label={text.label}
                            aria-label={text.clearFacet}
                        />
                        <BibButton
                            className="more"
                            bsStyle="primary"
                            onClick={clearFacet}
                            disabled={activeFacetValues.length === 0}
                            icon={{ name: 'close' }}
                            aria-label={text.clearFacet}
                        />
                    </ButtonGroup>
                    <div className="facet_values">
                        <CSSTransitionGroup
                            transitionName="pop"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {activeFacetValues.map(facetValue => {
                                return (
                                    <FacetValue
                                        key={facetValue.value}
                                        facetValue={facetValue}
                                        changeFacet={checked =>
                                            changeFacet(
                                                facetValue.id,
                                                facetValue.value,
                                                checked,
                                            )
                                        }
                                    />
                                );
                            })}
                        </CSSTransitionGroup>
                    </div>
                </div>
            }
        </CSSTransitionGroup>
    );
};

ActiveFacet.propTypes = {
    activeFacetValues: PropTypes.array,
    status: PropTypes.string,
    text: PropTypes.object,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired,
    clearFacet: PropTypes.func.isRequired,
};

ActiveFacet.defaultProps = {
    text: {
        label: 'Réinitialiser vos filtres',
    },
};

export default translate(ActiveFacet);
