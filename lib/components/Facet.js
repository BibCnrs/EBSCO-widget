import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import BibButton from './BibButton';
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
                    .slice(0, nbShown).map(facetValue => {
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
