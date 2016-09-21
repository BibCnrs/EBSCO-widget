import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import A2zSearch from '../components/A2zSearch';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = fromState.getQueryListLetters(state);
    const a2zMode = fromState.isInA2zMode(state);

    return {
        firstLetter,
        secondLetter,
        a2zMode
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeLetters: actions.changeLetters,
        onSearch: actions.a2zSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A2zSearch);
