import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from '../components/SearchInput';
import PublicationFieldSelector from './PublicationFieldSelector';
import PublicationDomainSelector from './PublicationDomainSelector';

function mapStateToProps(state) {
    const { term } = state.publication.search.queries[0];

    return {
        value: term,
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
