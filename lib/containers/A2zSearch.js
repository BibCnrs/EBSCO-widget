import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import A2zSearch from '../components/A2zSearch';
import * as fromState from '../reducers';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = fromState.getQueryListLetters(state);

    return {
        firstLetter,
        secondLetter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeLetters: actions.changeLetters,
        onSearch: actions.a2zSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A2zSearch);
