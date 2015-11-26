import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FullTextLimiter from '../components/FullTextLimiter';

function mapStateToProps(state) {
    return {
        fullText: state.limiters.get('fullText')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimitFullText: actions.limitFullText
    }, dispatch, 'hello');
}

export default connect(mapStateToProps, mapDispatchToProps)(FullTextLimiter);
