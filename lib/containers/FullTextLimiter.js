import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        limiter: 'fullText',
        label: 'Texte Intégral',
        value: state.article.search.limiters.fullText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimit: actions.article.limitSearch,
        onChange: actions.article.changeLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
