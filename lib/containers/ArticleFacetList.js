import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import * as fromFacets from '../reducers/facets';
import FacetList from '../components/FacetList';

function mapStateToProps(state) {
    const { facets } = state;

    return {
        facets: fromFacets.getFacetData(facets, 'article'),
        activeFacetValues: fromFacets.getActiveFacetValues(facets, 'article')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: (id, value, checked) => actions.changeFacet('article', id, value, checked),
        applyFacet: (name) => actions.applyFacet('article', name),
        clearFacet: () => actions.clearFacet('article')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
