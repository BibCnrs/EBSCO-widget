import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ExactMatchPlacard from '../components/ExactMatchPlacard';

import * as fromState from '../reducers';

function mapStateToProps(state) {
    const publication = fromState.getExactMatchPublication(state);

    return {
        publication
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExactMatchPlacard);
