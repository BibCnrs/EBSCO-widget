import { connect } from 'react-redux';
import compose from 'recompose/compose';

import actions from '../actions';
import Header from '../components/Header';
import translate from '../higherOrderComponents/translate';

import * as fromState from '../selectors';

const mapStateToProps = state => ({
    rights: fromState.getRights(state),
});

const mapDispatchToProps = {
    logout: actions.logout,
    showLogin: actions.showLogin,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(Header);
