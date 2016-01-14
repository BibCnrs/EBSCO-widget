import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Record from '../components/Record';

function mapStateToProps(state, ownProps) {
    const { record, index } = ownProps;
    return {
        record,
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
