import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';
import MetadoreSearchMenu from '../../components/Metadore/MetadoreSearchMenu';
import * as fromState from '../../selectors';

function mapStateToProps(state) {
    return {
        hasMetadoreSearchResult: fromState.hasMetadoreSearchResult(state),
        resultShown: fromState.isResultShown(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showResult: actions.showResult,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MetadoreSearchMenu);
