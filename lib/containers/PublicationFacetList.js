import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import parseFacetData from '../services/parseFacetData';
import getActiveFacetValues from '../services/getActiveFacetValues';
import FacetList from '../components/FacetList';

function mapStateToProps(state) {
    const { searchResult, search } = state.publication;
    return {
        facets: parseFacetData(searchResult.facets, search.activeFacets),
        activeFacetValues: getActiveFacetValues(search.activeFacets)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.publication.changeFacet,
        applyFacet: actions.publication.applyFacet,
        clearFacet: actions.publication.clearFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
