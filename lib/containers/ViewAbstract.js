import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ViewAbstract from '../components/ViewAbstract';

function mapStateToProps(state, ownProps) {
    const index  = ownProps.index;
    const searchResult = state.searchResult;
    const { abstractShown, abstract } = searchResult.get(searchResult.get('currentPage')).get(index).toJS();

    return {
        abstractShown,
        abstract,
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowAbstract: actions.showAbstract
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAbstract);
