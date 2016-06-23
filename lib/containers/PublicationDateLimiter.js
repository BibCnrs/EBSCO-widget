import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';
import * as fromLimiters from '../reducers/limiters';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { min, max } = state.search.article.dateRange;

    return {
        hasChanged: limiterHasChanged,
        publicationDate: fromLimiters.getValue(state.limiters, 'article', 'publicationDate'),
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
