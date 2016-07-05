import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import A2zSearch from '../components/A2zSearch';
import createDomainSelectorContainer from './createDomainSelectorContainer';
import * as fromState from '../reducers';

const A2zDomainSelector = createDomainSelectorContainer('a2z');

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = fromState.getQueryListLetters(state);

    return {
        firstLetter,
        secondLetter,
        DomainSelector: A2zDomainSelector
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeLetters: (...args) => actions.changeLetters(...args),
        search: (...args) => actions.searchTerm('a2z', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A2zSearch);
