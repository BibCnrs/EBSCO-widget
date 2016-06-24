import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SelectButton from '../components/SelectButton';

import { availableBoolean } from '../config/article';

function mapStateToProps(state, { index }) {
    const { queries } = state.search.article;
    const { boolean } = queries[index || 0] || { boolean: '' };

    return {
        value: boolean,
        choices: availableBoolean.map(value => ({ value, label: value }))
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        onChange: (value) => actions.changeQuery('article', value, 'boolean', ownProps.index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectButton);
