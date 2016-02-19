import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import App from '../components/App';

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
