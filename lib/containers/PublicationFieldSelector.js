import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { publicationFieldSelector } from '../selectors/fieldSelector';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.publication.changeField
    }, dispatch);
}

export default connect(publicationFieldSelector, mapDispatchToProps)(FieldSelector);
