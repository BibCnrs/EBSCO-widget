import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Facet from '../components/Facet';

function mapStateToProps(state) {

    return {
        facets: state.facets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.changeFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Facet);
