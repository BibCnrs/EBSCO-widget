import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';

function mapStateToProps(state, { text = { fullText: 'Texte Intégral' } }) {
    return {
        limiter: 'fullText',
        label: text.fullText,
        value: state.article.search.limiters.fullText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: actions.article.limitSearch,
        onChange: actions.article.changeLimiter
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), 'FullTextLimiter');
