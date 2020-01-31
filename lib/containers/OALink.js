import { connect } from 'react-redux';

import OALink from '../components/OALink';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const url = fromState.getUrl(state);

    return {
        apiUrl: url,
    };
}

const OALinkContainer = connect(mapStateToProps)(OALink);
OALinkContainer.displayName = 'OALinkContainer';

export default OALinkContainer;
