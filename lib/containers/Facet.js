import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Facet from '../components/Facet';

function mapStateToProps(state, ownProps) {
    const { facet } = ownProps;

    return {
        facet
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFacet: actions.article.changeFacet,
        applyFacet: actions.article.applyFacet
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Facet);
