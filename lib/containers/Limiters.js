import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Limiters from '../components/Limiters';

function mapStateToProps(state) {
    const  { limiterMoreShown } = state.userInterface;
    return {
        moreShown: limiterMoreShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.showMoreLimiter,
        onReset: actions.reset
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Limiters);
