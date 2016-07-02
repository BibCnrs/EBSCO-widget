import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import * as fromState from '../reducers';

function mapStateToProps(state) {
    return {
        open: fromState.isLoading(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
