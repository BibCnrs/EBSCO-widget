import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import InputLimiter from '../components/InputLimiter';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { author } = state.article.search.limiters;
    return {
        label: 'Auteur',
        limiter: 'author',
        hasChanged: limiterHasChanged,
        value: author
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.article.changeLimiter,
        onLimit: actions.article.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLimiter);
