import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Limiters from '../components/Limiters';

function mapStateToProps(state) {
    const  { moreShown } = state.search.limiters;
    return {
        moreShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.showMoreLimiter,
        onReset: actions.resetLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Limiters);
