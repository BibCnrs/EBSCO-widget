import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Home from '../components/Home';

function mapStateToProps(state) {
    const  { open, search } = state;
    const { term, searchedTerm } = search.toJS();
    return {
        open,
        term,
        searchedTerm
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: actions.searchTerm,
        onOpenSearch: actions.openSearch,
        onChangeTerm: actions.changeTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
