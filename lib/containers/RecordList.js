import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        records: searchResult.get(searchResult.get('currentPage'))
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);