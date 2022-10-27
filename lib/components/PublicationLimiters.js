import React from 'react';

import createCheckBoxLimiterContainer from '../containers/createCheckBoxLimiterContainer';

const PeerReviewedPublicationLimiter = createCheckBoxLimiterContainer(
    'publication',
    'peerReviewedPublication',
);

const OpenAccessLimiter = createCheckBoxLimiterContainer(
    'publication',
    'openAccess',
);

const PublicationLimiters = () => (
    <div className="limiters">
        <OpenAccessLimiter />
        <PeerReviewedPublicationLimiter />
    </div>
);

PublicationLimiters.propTypes = {};

export default PublicationLimiters;
