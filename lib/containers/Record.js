import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Record from '../components/Record';

function mapStateToProps(state, ownProps) {
    const { index, record } = ownProps;
    return {
        index,
        record
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
