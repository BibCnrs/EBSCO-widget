import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { availableFields } from '../config/article';

import * as fromState from '../selectors';

function mapStateToProps(state, { index }) {
    const field = fromState.getQueryListField(state, index);

    return {
        index,
        field,
        availableFields
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChangeField: (value) => actions.changeQuery('article', value, 'field', index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
