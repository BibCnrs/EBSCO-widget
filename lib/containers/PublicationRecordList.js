import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PublicationRecordList from '../components/PublicationRecordList';

function mapStateToProps(state) {
    const searchResult = state.publication.searchResult;

    return {
        publications: searchResult[searchResult.currentPage]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationRecordList);
