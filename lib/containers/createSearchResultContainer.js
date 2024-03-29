import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPaginationContainer from './createPaginationContainer';
import createSortSelectorContainer from './createSortSelectorContainer';
import createResultsPerPageSelectorContainer from './createResultsPerPageSelectorContainer';
import ExactMatchPlacard from './ExactMatchPlacard';
import SearchResult from '../components/SearchResult';
import * as fromState from '../selectors';
import actions from '../actions';

const RecordListContainers = {
    article: createRecordListContainer('article'),
    publication: createRecordListContainer('publication'),
    metadore: createRecordListContainer('metadore'),
};

const PaginationContainers = {
    article: createPaginationContainer('article'),
    publication: createPaginationContainer('publication'),
    metadore: createPaginationContainer('metadore'),
};

const SelectorContainers = {
    article: createSortSelectorContainer('article'),
    publication: createSortSelectorContainer('publication'),
};

const ResultsPerPageSelectorContainers = {
    article: createResultsPerPageSelectorContainer('article'),
    publication: createResultsPerPageSelectorContainer('publication'),
    metadore: createResultsPerPageSelectorContainer('metadore'),
};

const createSearchResultContainer = category => {
    function mapStateToProps(state) {
        return {
            ...fromState.getPaginationData(state),
            hasNoFullTextResult: fromState.hasNoFullTextResult(state),
            pageSelected: fromState.isPageSelected(state),
            status: fromState.getSearchStatus(state),
            RecordList: RecordListContainers[category],
            Pagination: PaginationContainers[category],
            SortSelector: SelectorContainers[category],
            ResultsPerPageSelector: ResultsPerPageSelectorContainers[category],
            ExactMatchPlacard:
                category === 'article' ? ExactMatchPlacard : null,
            category,
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                selectPage: (...args) => actions.selectPage(category, ...args),
            },
            dispatch,
        );
    }

    return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
};

export default createSearchResultContainer;
