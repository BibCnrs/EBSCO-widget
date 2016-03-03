import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import getLabelFromValue from '../services/getLabelFromValue';

function mapStateToProps(state, { index}) {
    const { queries, availableFields } = state.article.search;

    return {
        index,
        field: getLabelFromValue(queries[index || 0].field, availableFields),
        availableFields
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChangeField: (value) => actions.article.changeQuery(value, 'field', index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
