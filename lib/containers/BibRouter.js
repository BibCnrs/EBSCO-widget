import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BibRouter from '../components/BibRouter';

function mapStateToProps(state) {
    const { location, fullScreen } = state.userInterface;

    return {
        location,
        fullScreen
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibRouter);
