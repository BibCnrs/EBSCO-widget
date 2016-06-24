import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import * as fromFacets from '../reducers/facets';
import FacetList from '../components/FacetList';

const createFacetListContainer = (category) => {

    function mapStateToProps(state) {
        const { facets } = state;

        return {
            facets: fromFacets.getFacetData(facets, category),
            activeFacetValues: fromFacets.getActiveFacetValues(facets, category)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            changeFacet: (id, value, checked) => actions.changeFacet(category, id, value, checked),
            applyFacet: (name) => actions.applyFacet(category, name),
            clearFacet: () => actions.clearFacet(category)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(FacetList);
};

export default createFacetListContainer;
