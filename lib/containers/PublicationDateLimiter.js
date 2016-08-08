import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';
import * as fromState from '../reducers';

function mapStateToProps(state) {
    const { min, max } = fromState.getSearchDateRange(state);

    return {
        publicationDate: fromState.getLimiterValueByName(state, 'publicationDate') || {},
        min,
        max
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeLimiter: (...args) => actions.changeLimiter('article', ...args),
        onApply: (...args) => actions.limitSearch('article', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
