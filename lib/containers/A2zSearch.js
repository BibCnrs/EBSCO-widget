import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Search from '../components/A2zSearch';

function mapStateToProps(state) {
    const { term, domain } = state.a2z.search;

    return {
        term,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchTerm: actions.a2z.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
