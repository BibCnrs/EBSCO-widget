import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import PublicationLimiters from '../components/PublicationLimiters';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onReset: actions.publication.reset
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationLimiters);
