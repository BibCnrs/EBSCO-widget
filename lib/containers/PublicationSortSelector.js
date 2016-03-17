import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SortSelector from '../components/SortSelector';

import { availableSort } from '../config/publication';

function mapStateToProps(state) {
    const { sort } = state.publication.search;

    return {
        sort,
        availableSort
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeSort: actions.publication.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelector);
