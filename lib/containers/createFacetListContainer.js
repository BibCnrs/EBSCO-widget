import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import * as fromState from '../reducers';
import FacetList from '../components/FacetList';

const createFacetListContainer = (category) => {

    function mapStateToProps(state) {

        return {
            status: fromState.getSearchStatus(state),
            facets: fromState.getFacetData(state),
            activeFacetValues: fromState.getActiveFacetValues(state)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            changeFacet: (id, value, checked) => actions.changeFacet(category, id, value, checked),
            applyFacet: (...args) => actions.search(category, ...args),
            clearFacet: () => actions.clearFacet(category)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(FacetList);
};

export default createFacetListContainer;
