import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchLink from '../components/SearchLink';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        linkedSearch: actions.linkedSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLink);
