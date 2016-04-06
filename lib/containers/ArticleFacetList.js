import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import parseFacetData from '../services/parseFacetData';
import getActiveFacetValues from '../services/getActiveFacetValues';
import FacetList from '../components/FacetList';

function mapStateToProps(state) {
    const { searchResult, search } = state.article;
    return {
        facets: parseFacetData(searchResult.facets, search.activeFacets),
        activeFacetValues: getActiveFacetValues(search.activeFacets)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.article.changeFacet,
        applyFacet: actions.article.applyFacet,
        clearFacet: actions.article.clearFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
