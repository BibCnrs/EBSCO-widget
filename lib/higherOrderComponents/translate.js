import { default as React } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const languages = {
    en: {
        ActiveFacet: {
            label: 'Actual selection'
        }
    },
    fr: {
        ActiveFacet: {
            label: 'Sélection actuelle'
        }
    }
};

export function mapStateToProps(state, props) {
    return {
        props,
        language: state.userInterface.language
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export const translator = (languages) => (Component, name = Component.name) => {
    const TranslatedComponent = ({ props, language }) => {
        const text = languages[language][name];

        return <Component {...props} text={text} />;
    };

    return connect(mapStateToProps, mapDispatchToProps)(TranslatedComponent);
};


export default translator(languages);
