import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FacetList from '../components/FacetList';

function mapStateToProps(state) {

    return {
        facets: state.facets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacetList);
