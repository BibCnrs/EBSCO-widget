import React, { PropTypes } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import BibButton from './BibButton';
import FacetValue from './FacetValue';

const ActiveFacet = ({ activeFacetValues, changeFacet, applyFacet, clearFacet }) => {
    if (!activeFacetValues.length) {
        return <span/>;
    }

    return (
        <div className="facet">
            <ButtonGroup
                justified
                className="header"
            >
                <BibButton
                    className="title"
                    bsStyle='default'
                    onClick={applyFacet}
                    label="Sélection"
                />
                <BibButton
                    className="more"
                    bsStyle='default'
                    onClick={clearFacet}
                    icon={{ name: 'close' }}
                />
            </ButtonGroup>
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
        </div>
    );
};

ActiveFacet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default ActiveFacet;
