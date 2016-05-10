import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FullScreen from '../components/FullScreen';

function mapStateToProps(state) {
    const { fullScreen } = state.userInterface;

    return {
        fullScreen
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen);
