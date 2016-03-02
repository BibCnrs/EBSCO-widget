import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import PrimarySearchInput from '../components/PrimarySearchInput';
import PublicationFieldSelector from './PublicationFieldSelector';
import PublicationDomainSelector from './PublicationDomainSelector';

function mapStateToProps(state) {
    const domains = state.publication.domains;
    const { term, domain } = state.publication.search;

    return {
        term,
        domains,
        domain,
        fieldSelector: <PublicationFieldSelector/>,
        domainSelector: <PublicationDomainSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.publication.changeTerm,
        onChangeDomain: actions.publication.changeDomain,
        onSearchTerm: actions.publication.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchInput);
