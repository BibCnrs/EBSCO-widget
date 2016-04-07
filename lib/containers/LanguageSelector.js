import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SelectButton from '../components/SelectButton';

const availableLanguages = [
    { value: 'fr', label: 'français' },
    { value: 'en', label: 'english' }
];

function mapStateToProps(state) {
    const { language } = state.userInterface;

    return {
        value: language,
        choices: availableLanguages,
        bsStyle: 'link'
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: (value) => actions.changeLanguage(value)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectButton);
