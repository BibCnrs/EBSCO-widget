import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from '../components/Loader';

function mapStateToProps(state) {
    return {
        open: state.userInterface.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
