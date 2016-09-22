import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FullScreen from '../components/FullScreen';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const fullScreen = fromState.isFullScreen(state);

    return {
        fullScreen
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen);
