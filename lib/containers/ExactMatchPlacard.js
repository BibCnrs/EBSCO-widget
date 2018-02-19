import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ExactMatchPlacard from '../components/ExactMatchPlacard';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const { publication, noticeShown } = fromState.getExactMatch(state);
    const notice = fromState.getExactMatchNotice(state);
    return {
        publication,
        notice,
        noticeShown,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showNotice: actions.showExactMatchNotice,
            exactMatchSearch: actions.exactMatchSearch,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExactMatchPlacard);
