import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import getLabelFromValue from '../services/getLabelFromValue';

function mapStateToProps(state) {
    const { field, availableFields } = state.publication.search;

    return {
        field: getLabelFromValue(field, availableFields),
        availableFields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.publication.changeField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
