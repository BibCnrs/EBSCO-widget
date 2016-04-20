import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import Record from './A2zRecord';

function mapStateToProps(state) {
    const searchResult = state.a2z.searchResult;

    return {
        records: searchResult[searchResult.currentPage],
        Record
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
