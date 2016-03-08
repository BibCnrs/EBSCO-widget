import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchableField from '../components/SearchableField';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        linkedSearch: actions.article.linkedSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchableField);
