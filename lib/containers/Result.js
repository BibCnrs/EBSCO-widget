import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Result from '../components/Result';

function mapStateToProps(state, ownProps) {
    const { index, url } = ownProps;
    return {
        url,
        index,
        result: state.results.get(index).toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
