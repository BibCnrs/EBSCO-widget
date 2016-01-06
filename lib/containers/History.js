import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import History from '../components/History';

function mapStateToProps(state) {
    return {
        queries: state.history
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
