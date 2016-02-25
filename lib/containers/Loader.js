import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Loader from '../components/Loader';

function mapStateToProps(state) {
    return {
        open: state.userInterface.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.article.showMoreLimiter,
        onReset: actions.reset
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
