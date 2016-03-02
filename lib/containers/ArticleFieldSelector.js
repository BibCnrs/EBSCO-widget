import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { getFieldLabel } from '../selectors/fieldSelector';

function mapStateToProps(state, { index}) {
    const { queries, availableFields } = state.article.search;

    return {
        index,
        field: getFieldLabel(queries[index || 0].field, availableFields),
        availableFields
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChangeField: (value) => actions.article.changeQueryField(value, index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
