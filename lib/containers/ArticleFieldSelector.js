import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';

function mapStateToProps(state) {
    const { field } = state.article.search;

    return {
        field,
        availableField: [
            {
                label: 'Tout',
                value: null
            },
            {
                label: 'Tous le texte',
                value: 'TX'
            }, {
                label: `Auteur`,
                value: 'AU'
            }, {
                label: `Titre`,
                value: 'TI'
            }, {
                label: `Sujet`,
                value: 'SU'
            }, {
                label: `Source`,
                value: 'S0'
            }, {
                label: `Résumé`,
                value: 'AB'
            }, {
                label: `ISSN`,
                value: 'IS'
            }, {
                label: `ISBN`,
                value: 'IB'
            }
        ]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.article.changeField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
