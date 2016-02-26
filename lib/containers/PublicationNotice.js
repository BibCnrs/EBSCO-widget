import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationNotice from '../components/PublicationNotice';

function mapStateToProps(state) {
    const searchResult = state.publication.searchResult;
    const index = state.userInterface.notice;
    if (index === null) {
        return {
            index
        };
    }
    const { notice, fullTextHoldings } = searchResult[searchResult.currentPage][index];

    return {
        index,
        notice,
        fullTextHoldings
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.publication.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationNotice);
