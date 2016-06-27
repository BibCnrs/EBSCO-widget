import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import A2zSearch from '../components/A2zSearch';
import createDomainSelectorContainer from './createDomainSelectorContainer';

import * as fromQueryList from '../reducers/queryList';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = fromQueryList.getLetters(state.queryList, 'a2z');

    return {
        firstLetter,
        secondLetter,
        DomainSelector: createDomainSelectorContainer('a2z')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeLetters: (...args) => actions.changeLetters(...args),
        search: (...args) => actions.searchTerm('a2z', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A2zSearch);
