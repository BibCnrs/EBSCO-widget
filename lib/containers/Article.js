import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Article from '../components/Article';

function mapStateToProps(state, ownProps) {
    const { article, index } = ownProps;
    return {
        article,
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
