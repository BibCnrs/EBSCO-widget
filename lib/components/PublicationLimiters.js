import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import PeerReviewedPublicationLimiter from '../containers/PeerReviewedPublicationLimiter';

const PublicationLimiters = ({}) => (
    <div className="limiters">
        <PeerReviewedPublicationLimiter/>
    </div>
);

PublicationLimiters.propTypes = {
};

export default PublicationLimiters;
