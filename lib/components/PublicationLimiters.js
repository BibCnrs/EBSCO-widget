import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import PeerReviewedPublicationLimiter from '../containers/PeerReviewedPublicationLimiter';

const PublicationLimiters = ({ onReset }) => (
    <div className="limiters">
        <h4>
            Limiter à
            <BibButton
                className='reset'
                onClick={() => onReset()}
                label="RàZ"
                tooltip="remise à zéro"
                icon={{ name: 'power-off' }}
            />
        </h4>
        <PeerReviewedPublicationLimiter/>
    </div>
);

PublicationLimiters.propTypes = {
};

export default PublicationLimiters;
