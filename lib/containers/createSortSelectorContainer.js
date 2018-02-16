import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SortSelector from '../components/SortSelector';
import { availableSort as articleAvailableSort } from '../config/article';
import { availableSort as publicationAvailableSort } from '../config/publication';
import * as fromState from '../selectors';

const createSortSelectorContainer = category => {
    function mapStateToProps(state) {
        return {
            sort: fromState.getSearchSort(state),
            availableSort:
                category === 'article'
                    ? articleAvailableSort
                    : publicationAvailableSort,
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                onChangeSort: (...args) =>
                    actions.changeSort(category, ...args),
            },
            dispatch,
        );
    }

    return connect(mapStateToProps, mapDispatchToProps)(SortSelector);
};

export default createSortSelectorContainer;
