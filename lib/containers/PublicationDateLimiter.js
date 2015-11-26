import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';

function mapStateToProps(state) {
    return {
        publicationDate: state.limiters.get('publicationDate').toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangePublicationDate: actions.changePublicationDate,
        onLimitPublicationDate: actions.limitPublicationDate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
