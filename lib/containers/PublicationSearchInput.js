import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from '../components/SearchInput';
import PublicationFieldSelector from './PublicationFieldSelector';
import PublicationDomainSelector from './PublicationDomainSelector';
import translate from '../higherOrderComponents/translate';

function mapStateToProps(state, { text = { searchPlaceholder: 'Rechercher des titres de revues, de livres...' } }) {
    const { term } = state.publication.search;

    return {
        value: term,
        placeholder: text.searchPlaceholder,
        buttonBefore: <PublicationDomainSelector/>,
        buttonAfter: <PublicationFieldSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.publication.changeTerm,
        onApply: actions.publication.searchTerm
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(SearchInput), 'PublicationSearchInput');
