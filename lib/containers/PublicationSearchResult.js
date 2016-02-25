import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PublicationSearchResult from '../components/PublicationSearchResult';

function mapStateToProps(state) {
    const searchResult = state.publication.searchResult;
    const publications = searchResult[searchResult.currentPage];
    const first = publications && publications[0] && publications[0].id;
    const last = Array.isArray(publications) && publications.slice(-1)[0] && publications.slice(-1)[0].id;
    return {
        first,
        last,
        totalHits: searchResult.totalHits,
        maxPage: searchResult.maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationSearchResult);
