import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BibRouter from '../components/BibRouter';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const location = fromState.getLocation(state);

    return {
        location
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibRouter);
