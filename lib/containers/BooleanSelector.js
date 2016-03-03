import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SelectButton from '../components/SelectButton';

function mapStateToProps(state, ownProps) {
    const { index } = ownProps;
    const { availableBoolean, queries } = state.article.search;
    const { boolean } = queries[index || 0];

    return {
        value: boolean,
        choices: availableBoolean.map(value => ({ value, label: value }))
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        onChange: (value) => actions.article.changeQuery(value, 'boolean', ownProps.index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectButton);
