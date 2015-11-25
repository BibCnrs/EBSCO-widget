import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationDateLimiter from '../components/PublicationDateLimiter';

function mapStateToProps(state) {
    return {
        fromPublicationDate: state.limiters.get('fromPublicationDate'),
        toPublicationDate: state.limiters.get('toPublicationDate')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangePublicationDate: actions.changePublicationDate,
        onLimitPublicationDate: actions.limitPublicationDate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationDateLimiter);
