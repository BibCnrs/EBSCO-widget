import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ExactMatchPlacard from '../components/ExactMatchPlacard';

import * as fromState from '../reducers';

function mapStateToProps(state) {
    const { publication, noticeShown } = fromState.getExactMatch(state);
    const notice = fromState.getExactMatchNotice(state);
    return {
        publication,
        notice,
        noticeShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.showExactMatchNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExactMatchPlacard);
