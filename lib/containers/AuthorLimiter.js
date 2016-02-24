import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import InputLimiter from '../components/InputLimiter';
import applyIfChange from './applyIfChange';

function mapStateToProps(state) {
    const { author } = state.article.search.limiters;

    return {
        label: 'Auteur',
        limiter: 'author',
        value: author
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.article.changeLimiter,
        onApply: actions.article.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(applyIfChange(InputLimiter));
