import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Loader from '../components/Loader';

function mapStateToProps(state) {
    return {
        open: state.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.showMoreLimiter,
        onReset: actions.resetLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
