import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPaginationContainer from './createPaginationContainer';
import createSortSelectorContainer from './createSortSelectorContainer';
import createResultsPerPageSelector from './createResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

const createSearchResultContainer = (category) => {

    function mapStateToProps(state) {
        const searchResult = state.searchResult;

        return {
            ...fromSearchResult.getPaginationData(searchResult, category),
            RecordList: createRecordListContainer(category),
            Pagination: createPaginationContainer(category),
            SortSelector: createSortSelectorContainer(category),
            ResultsPerPageSelector: createResultsPerPageSelector(category)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
};

export default createSearchResultContainer;
