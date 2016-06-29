import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { availableFields } from '../config/article';

import * as fromQueryList from '../reducers/queryList';

function mapStateToProps(state, { index }) {
    const field = fromQueryList.getField(state.queryList, 'article', index);

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
