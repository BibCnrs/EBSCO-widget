import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';

function mapStateToProps(state) {
    const { field } = state.publication.search;

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
                label: `ISSN`,
                value: 'IS'
            }, {
                label: `ISBN`,
                value: 'IB'
            }, {
                label: `Type de resource`,
                value: 'PT'
            }, {
                label: `Editeur`,
                value: 'PU'
            }
        ]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.publication.changeField
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelector);
