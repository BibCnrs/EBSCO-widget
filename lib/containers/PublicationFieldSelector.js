import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { availableFields } from '../config/publication';

function mapStateToProps(state) {
    const { field } = state.publication.search;

    return {
        field: field,
        availableFields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.publication.changeField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
