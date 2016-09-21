import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import NameLimiter from '../components/NameLimiter';
import translate from '../higherOrderComponents/translate';
import * as fromState from '../reducers';


function mapStateToProps(state, { text = { publication: 'Publication' } }) {
    const publicationId = fromState.getLimiterValueByName(state, 'publicationId') || {};
    return {
        label: text.publication,
        value: publicationId.label
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onRemove: () => actions.changeLimiter('article', 'publicationId', null),
        onApply: () => actions.search('article')
    }, dispatch);
}


export default translate(connect(mapStateToProps, mapDispatchToProps)(NameLimiter), 'PublicationIdLimiter');
