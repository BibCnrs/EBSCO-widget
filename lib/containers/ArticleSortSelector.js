import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SortSelector from '../components/SortSelector';

function mapStateToProps(state) {
    const { sort, availableSort } = state.article.search;

    return {
        sort,
        availableSort
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeSort: actions.article.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelector);
