import { default as React } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fr from '../config/i18n/fr';
import en from '../config/i18n/en';

const languages = {
    en,
    fr,
};

export function mapStateToProps(state, props) {
    return {
        props,
        language: state.userInterface.language,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export const translator = languages => (Component, name = Component.name) => {
    const TranslatedComponent = ({ language, ...props }) => {
        const text = languages[language][name];

        return <Component {...props} text={text} />;
    };

    TranslatedComponent.propTypes = {
        language: PropTypes.oneOf(['fr', 'en']).isRequired,
    };

    return connect(mapStateToProps, mapDispatchToProps)(TranslatedComponent);
};

export default translator(languages);
