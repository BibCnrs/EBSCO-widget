import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FacetList from '../components/FacetList';

function mapStateToProps(state) {

    return {
        facets: state.article.facets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.article.changeFacet,
        applyFacet: actions.article.applyFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
