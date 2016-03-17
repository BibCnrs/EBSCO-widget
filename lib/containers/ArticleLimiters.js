import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import ArticleLimiters from '../components/ArticleLimiters';

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowMore: actions.article.showMoreLimiter,
        onReset: actions.article.reset
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleLimiters);
