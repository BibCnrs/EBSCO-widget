import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import getLabelFromValue from '../services/getLabelFromValue';

function mapStateToProps(state, { index}) {
    const { queries, availableFields } = state.publication.search;

    return {
        index,
        field: getLabelFromValue(queries[index || 0].field, availableFields),
        availableFields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.publication.changeField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
