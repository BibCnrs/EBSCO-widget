import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Sort from '../components/Sort';

function mapStateToProps(state) {
    const { sort } = state.publication.search;

    return {
        sort,
        availableSort: [
            {
                label: 'pertinence',
                value: 'relevance'
            }, {
                label: 'titre (A à Z)',
                value: 'title'
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
        onChangeSort: actions.publication.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
