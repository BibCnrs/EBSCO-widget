import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import BibButton from '../components/BibButton';

function mapStateToProps() {
    return {
        label: 'Logout',
        icon: { name: 'sign-out' },
        className: 'logout',
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onClick: actions.logout,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BibButton);
