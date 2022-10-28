import React from 'react';

import createCheckBoxLimiterContainer from '../containers/createCheckBoxLimiterContainer';

const PeerReviewedPublicationLimiter = createCheckBoxLimiterContainer(
    'publication',
    'peerReviewedPublication',
);

const PublicationLimiters = () => (
    <div className="limiters">
        <PeerReviewedPublicationLimiter />
    </div>
);

PublicationLimiters.propTypes = {};

export default PublicationLimiters;
