import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import BibNavbar from '../components/BibNavbar';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const location = fromState.getLocation(state);
    const fullScreen = fromState.isFullScreen(state);

    return {
        fullScreen,
        location,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navigate: actions.navigate,
            setFullScreen: actions.setFullScreen,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BibNavbar);
