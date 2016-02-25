import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';

function mapStateToProps(state) {
    const { limiterHasChanged } = state.userInterface;
    const { publicationDate } = state.article.search.limiters;
    return {
        hasChanged: limiterHasChanged,
        publicationDate
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeLimiter: actions.article.changeLimiter,
        onLimitSearch: actions.article.limitSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
