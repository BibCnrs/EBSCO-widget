import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPaginationContainer from './createPaginationContainer';
import createSortSelectorContainer from './createSortSelectorContainer';
import createResultsPerPageSelectorContainer from './createResultsPerPageSelectorContainer';
import SearchResult from '../components/SearchResult';
import * as fromState from '../reducers';
import actions from '../actions';

const RecordListContainers = {
    article: createRecordListContainer('article'),
    a2z: createRecordListContainer('a2z'),
    publication: createRecordListContainer('publication')
};

const PaginationContainers = {
    article: createPaginationContainer('article'),
    a2z: createPaginationContainer('a2z'),
    publication: createPaginationContainer('publication')
};

const SelectorContainers = {
    article: createSortSelectorContainer('article'),
    a2z: createSortSelectorContainer('a2z'),
    publication: createSortSelectorContainer('publication')
};

const ResultsPerPageSelectorContainers = {
    article: createResultsPerPageSelectorContainer('article'),
    a2z: createResultsPerPageSelectorContainer('a2z'),
    publication: createResultsPerPageSelectorContainer('publication')
};

const createSearchResultContainer = (category) => {

    function mapStateToProps(state) {
        return {
            ...fromState.getPaginationData(state),
            pageSelected: fromState.isPageSelected(state),
            status: fromState.getSearchStatus(state),
            RecordList: RecordListContainers[category],
            Pagination: PaginationContainers[category],
            SortSelector: SelectorContainers[category],
            ResultsPerPageSelector: ResultsPerPageSelectorContainers[category]
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            selectPage: (...args) => actions.selectPage(category, ...args)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
};

export default createSearchResultContainer;
