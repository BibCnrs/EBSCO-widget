import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SelectButton from '../components/SelectButton';

const availableLanguages = [
    'fr',
    'en'
];

function mapStateToProps(state) {
    const { language } = state.userInterface;

    return {
        value: language,
        choices: availableLanguages.map(value => ({ value, label: value })),
        bsStyle: 'link'
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: (value) => actions.changeLanguage(value)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectButton);
