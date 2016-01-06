import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        limiter: 'fullText',
        label: 'Texte Intégral',
        value: state.search.limiters.fullText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimit: actions.limitSearch,
        onChange: actions.changeLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
