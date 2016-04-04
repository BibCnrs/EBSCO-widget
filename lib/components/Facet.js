import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';

const parseId = (id) => {
    switch(id) {
    case 'SubjectPubDb':
        return 'Subject';
    case 'TypePublicationPubD':
        return 'Publication Type';
    case 'PublisherPubDb':
        return 'Publisher';
    default:
        return id;
    }
};

const Facet = ({ facet, changeFacet, applyFacet }) => {
    return (
        <div>
            <h3>{facet.label.replace('PubDb', '') || parseId(facet.id)}</h3>
            {facet.availableFacetValues.map(facetValue => {
                return (
                    <Input
                        type="checkbox"
                        key={facetValue.value}
                        label={`${facetValue.value} ${facetValue.count ? `(${facetValue.count})` : ''}`}
                        checked={facet.activeFacets.indexOf(facetValue.value) !== -1}
                        onChange={
                            (event) => {
                                const values = event.target.checked ?
                                    [ ...facet.activeFacets, facetValue.value ]
                                :
                                    _.without(facet.activeFacets, facetValue.value)
                                ;

                                return changeFacet(facet.id, values);
                            }
                        }
                    />
                );
            })}
        </div>
    );
};

Facet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default Facet;
