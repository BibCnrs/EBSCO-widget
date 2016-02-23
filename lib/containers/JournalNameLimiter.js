import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import InputLimiter from '../components/InputLimiter';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { journalName } = state.articleSearch.limiters;
    return {
        label: 'Journal',
        limiter: 'journalName',
        hasChanged: limiterHasChanged,
        value: journalName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.changeLimiter,
        onLimit: actions.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLimiter);
