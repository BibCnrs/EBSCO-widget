import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import InputLimiter from '../components/InputLimiter';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { title } = state.article.search.limiters;
    return {
        label: 'Titre',
        limiter: 'title',
        hasChanged: limiterHasChanged,
        value: title
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.article.changeLimiter,
        onApply: actions.article.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLimiter);
