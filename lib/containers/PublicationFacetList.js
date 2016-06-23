import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import * as fromFacets from '../reducers/facets';
import FacetList from '../components/FacetList';

function mapStateToProps(state) {
    const { facets } = state;

    return {
        facets: fromFacets.getFacetData(facets, 'publication'),
        activeFacetValues: fromFacets.getActiveFacetValues(facets, 'publication')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: (id, value, checked) => actions.changeFacet('publication', id, value, checked),
        applyFacet: (name) => actions.applyFacet('publication', name),
        clearFacet: () => actions.clearFacet('publication')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
