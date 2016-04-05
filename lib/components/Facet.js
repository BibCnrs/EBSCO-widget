import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import BibButton from './BibButton';
import FacetValue from './FacetValue';

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

const Facet = React.createClass({
    getInitialState: function () {
        return {
            showAll: false
        };
    },
    render: function() {
        const { facet, changeFacet, applyFacet } = this.props;
        const { showAll } = this.state;
        const nbShown = showAll ? facet.availableFacetValues.length : Math.max(3, facet.activeFacets.length);
        const nbHidden = facet.availableFacetValues.length - nbShown;

        return (
            <div>
                <BibButton
                    block={true}
                    bsStyle='default'
                    onClick={applyFacet}
                    icon={ {name: 'search' }}
                    label={facet.label.replace('PubDb', '') || parseId(facet.id)}
                />
                {
                    facet.availableFacetValues
                    .slice(0, nbShown).map((facetValue, index) => {
                        return (
                            <FacetValue
                                key={index}
                                facetValue={facetValue}
                                changeFacet={(checked) => changeFacet(facet.id, facetValue.value, checked)}
                            />
                        );
                    })
                }
                {
                    (nbHidden > 0  || showAll) ? <BibButton
                        bsStyle='link'
                        onClick={() => this.setState({ ...this.state, showAll: !showAll })}
                        label={`${showAll ? 'moins' : `plus (${nbHidden})`}`}
                    /> : <span/>
                }
            </div>
        );
    }
});

Facet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default Facet;
