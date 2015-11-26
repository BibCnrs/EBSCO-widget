import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import InputLimiter from '../components/InputLimiter';

function mapStateToProps(state) {
    const { hasChanged, title } = state.limiters.toJS();
    return {
        label: 'Titre',
        limiter: 'title',
        hasChanged,
        value: title
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.changeLimiter,
        onLimit: actions.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLimiter);
