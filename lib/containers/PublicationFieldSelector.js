import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { availableFields } from '../config/publication';

import * as fromQueryList from '../reducers/queryList';

function mapStateToProps(state) {
    const field = fromQueryList.getField(state.queryList, 'publication', 0);

    return {
        field: field,
        availableFields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: (...args) => actions.changeField('publication', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
