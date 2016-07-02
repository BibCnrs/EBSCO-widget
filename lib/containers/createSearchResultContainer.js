import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPaginationContainer from './createPaginationContainer';
import createSortSelectorContainer from './createSortSelectorContainer';
import createResultsPerPageSelectorContainer from './createResultsPerPageSelectorContainer';
import SearchResult from '../components/SearchResult';
import * as fromState from '../reducers';

const createSearchResultContainer = (category) => {

    function mapStateToProps(state) {
        return {
            ...fromState.getPaginationData(state),
            RecordList: createRecordListContainer(category),
            Pagination: createPaginationContainer(category),
            SortSelector: createSortSelectorContainer(category),
            ResultsPerPageSelector: createResultsPerPageSelectorContainer(category)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
};

export default createSearchResultContainer;
