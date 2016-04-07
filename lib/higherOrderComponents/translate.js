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

export default function translate(Component, name = Component.name) {
    const TranslatedComponent = ({ props, language }) => {
        var text = languages[language][name];

        return <Component {...props} text={text} />;
    };

    function mapStateToProps(state, props) {
        return {
            props,
            language: state.userInterface.language
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(TranslatedComponent);
}
