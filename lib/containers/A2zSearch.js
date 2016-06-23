import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Search from '../components/A2zSearch';
import createDomainSelector from './createDomainSelector';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = state.search.a2z;

    return {
        firstLetter,
        secondLetter,
        DomainSelector: createDomainSelector('a2z')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchTerm: () => actions.searchTerm('a2z')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
