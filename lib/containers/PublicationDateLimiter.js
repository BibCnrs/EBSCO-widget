import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { publicationDate } = state.article.search.limiters;
    const { min, max } = state.article.search.dateRange;

    return {
        hasChanged: limiterHasChanged,
        publicationDate,
        min,
        max
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeLimiter: actions.article.changeLimiter,
        onLimitSearch: actions.article.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
