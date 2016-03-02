import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FieldSelector from '../components/FieldSelector';
import { articleFieldSelector } from '../selectors/fieldSelector';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeField: actions.article.changeField
    }, dispatch);
}

export default connect(articleFieldSelector, mapDispatchToProps)(FieldSelector);
