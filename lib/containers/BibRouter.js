import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BibRouter from '../components/BibRouter';

function mapStateToProps(state) {
    const { location } = state.userInterface;

    return {
        location
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibRouter);
