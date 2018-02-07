import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ButtonGroup } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';
import BibButton from './BibButton';
import FacetValue from './FacetValue';
export class Facet extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAll: false
        };
    }
    toggleList(nbHidden, showAll) {
        this.setState({ ...this.state, showAll: nbHidden > 0  && !showAll });
    }
    render() {
        const { facet, status, changeFacet, text } = this.props;
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
                        label={`${text[facet.id] || facet.label || facet.id} (${facet.availableFacetValues.length})`}
                    />
                    <BibButton
                        className="more"
                        bsStyle='default'
                        onClick={() => this.toggleList(nbHidden, showAll)}
                        icon={{ name: nbHidden <= 0  || showAll ? 'chevron-down'  : 'chevron-right'}}
                    />
                </ButtonGroup>
                <div className="facet_values">
                    {/* <ReactCSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}> */}
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
                    {/* </ReactCSSTransitionGroup> */}
                </div>
            </div>
        );
    }
}

Facet.propTypes = {
    facet: PropTypes.object,
    status: PropTypes.string.isRequired,
    changeFacet: PropTypes.func.isRequired,
    text: PropTypes.object
};

Facet.defaultProps = {
    text: {
        SubjectPubDb: 'Subject',
        TypePublicationPubD: 'Publication Type',
        PublisherPubDb: 'Publisher'
    }
};

export default translate(Facet);
