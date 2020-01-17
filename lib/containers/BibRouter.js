import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BibRouter from '../components/BibRouter';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const location = fromState.getLocation(state);
    const isInistAccount = fromState.isUserLogged(state)
        ? !fromState.hasProfile(state)
        : false;
    const isJanusAccount =
        fromState.isUserLogged(state) && fromState.hasProfile(state);

    return {
        location,
        isInistAccount,
        isJanusAccount,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibRouter);
