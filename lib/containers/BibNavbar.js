import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import BibNavbar from '../components/BibNavbar';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const location = fromState.getLocation(state);

    return {
        location,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navigate: actions.navigate,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BibNavbar);
