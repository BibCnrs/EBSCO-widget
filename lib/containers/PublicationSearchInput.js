import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from '../components/SearchInput';
import PublicationFieldSelector from './PublicationFieldSelector';
import PublicationDomainSelector from './PublicationDomainSelector';

function mapStateToProps(state) {
    const { term } = state.publication.search;

    return {
        value: term,
        placeholder: 'Rechercher des titres de revues, de livres...',
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
