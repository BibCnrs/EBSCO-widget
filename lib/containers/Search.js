import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state, ownProps) {
    const { status, error, term, limiters } = state.search.toJS();

    return {
        status,
        error,
        term,
        limiters,
        url: ownProps.url,
        token: state.login.get('token')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeFullText: actions.changeFullText,
        onChangeTerm: actions.changeTerm,
        onSearch: actions.search
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
