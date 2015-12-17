import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchResult from '../components/SearchResult';

function mapStateToProps(state) {
    return {
        maxPage: state.searchResult.get('maxPage')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
