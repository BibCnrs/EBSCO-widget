import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Search from '../components/A2zSearch';

function mapStateToProps(state) {
    const { firstLetter, secondLetter } = state.a2z.search;

    return {
        firstLetter,
        secondLetter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchTerm: actions.a2z.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
