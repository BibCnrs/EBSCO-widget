import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FacetList from '../components/FacetList';

function mapStateToProps(state) {

    return {
        facets: state.publication.facets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.publication.changeFacet,
        applyFacet: actions.publication.applyFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
