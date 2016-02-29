import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Sort from '../components/Sort';

function mapStateToProps(state) {
    const { sort } = state.article.search;

    return {
        sort,
        availableSort: [
            {
                label: 'pertinence',
                value: 'relevance'
            }, {
                label: `date de publication décroissante`,
                value: 'date'
            }, {
                label: `date de publication croissante`,
                value: 'date2'
            }
        ]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeSort: actions.article.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
