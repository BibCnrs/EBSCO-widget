import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ButtonGroup } from 'react-bootstrap';

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
    getInitialState() {
        return {
            showAll: false
        };
    },
    toggleList(nbHidden, showAll) {
        this.setState({ ...this.state, showAll: nbHidden > 0  && !showAll });
    },
    render: function() {
        const { facet, status, changeFacet } = this.props;
        const { showAll } = this.state;
        const nbShown = showAll ? facet.availableFacetValues.length : Math.max(3, facet.activeFacets.length);
        const nbHidden = facet.availableFacetValues.length - nbShown;

        return (
            <div className="facet">
                <ButtonGroup
                    justified
                    className="header"
                >
                    <BibButton
                        block={true}
                        className="title"
                        bsStyle='default'
                        onClick={() => this.toggleList(nbHidden, showAll)}
                        status={status}
                        label={`${(facet.label || parseId(facet.id)).replace('PubDb', '')} (${facet.availableFacetValues.length})`}
                    />
                    <BibButton
                        className="more"
                        bsStyle='default'
                        onClick={() => this.toggleList(nbHidden, showAll)}
                        icon={{ name: nbHidden <= 0  || showAll ? 'chevron-down'  : 'chevron-right'}}
                    />
                </ButtonGroup>
                <div className="facet_values">
                    <ReactCSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
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
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    },
    propTypes: {
        facet: PropTypes.object,
        status: PropTypes.string.isRequired,
        changeFacet: PropTypes.func.isRequired
    }
});

export default Facet;
