import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Home from '../components/Home';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: actions.searchTerm,
        onOpenSearch: actions.openSearch,
        onChangeTerm: actions.changeArticleTerm
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Home);
