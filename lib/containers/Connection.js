import { connect } from 'react-redux';
import compose from 'recompose/compose';

import actions from '../actions';
import Connection from '../components/Connection';
import translate from '../higherOrderComponents/translate';

const mapStateToProps = state => ({
    logged: !!state.login.token,
});

const mapDispatchToProps = {
    showLogin: actions.showLogin,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(Connection);
