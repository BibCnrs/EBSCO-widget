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
        changeLetters: (...args) => actions.changeLetters(...args),
        onSearch: (...args) => actions.search('a2z', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A2zSearch);
