'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Limiters from '../components/Limiters';

function mapStateToProps(state) {
    const  { moreShown } = state.limiters.toJS();
    return {
        moreShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.showMoreLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Limiters);
