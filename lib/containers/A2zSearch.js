import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Search from '../components/A2zSearch';
import createDomainSelectorContainer from './createDomainSelectorContainer';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = state.search.a2z;

    return {
        firstLetter,
        secondLetter,
        DomainSelector: createDomainSelectorContainer('a2z')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchLetters: (...args) => {
            console.log(args);
            return actions.searchLetters(...args);
        }
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
