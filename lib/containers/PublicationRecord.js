import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationRecord from '../components/PublicationRecord';

function mapStateToProps(state, ownProps) {
    const { publication, index } = ownProps;
    return {
        publication,
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.publication.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
