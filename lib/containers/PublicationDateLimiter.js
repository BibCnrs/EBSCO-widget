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
        publicationDate: fromLimiters.getValueByName(state.limiters, 'article', 'publicationDate'),
        min,
        max
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: (...args) => actions.changeLimiter('publication', ...args),
        onapply: (...args) => actions.limitSearch('publication', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
