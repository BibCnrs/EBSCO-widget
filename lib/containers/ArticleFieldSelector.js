import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { availableFields } from '../config/article';

function mapStateToProps(state, { index }) {
    const { queries } = state.search.article;
    const { field } = queries[index || 0] || { field: '' };

    return {
        index,
        field,
        availableFields
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChangeField: (value) => actions.article.changeQuery('article', value, 'field', index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
