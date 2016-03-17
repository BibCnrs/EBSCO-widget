import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedArticleLimiter from '../containers/PeerReviewedArticleLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';

const ArticleLimiters = ({ onReset }) => (
    <div className="limiters">
        <FullTextLimiter/>
        <h4>
            <BibButton
                className='reset'
                onClick={() => onReset()}
                label="RàZ"
                tooltip="remise à zéro"
                icon={{ name: 'power-off' }}
            />
        </h4>
        <PeerReviewedArticleLimiter/>
        <PublicationDateLimiter/>
    </div>
);

ArticleLimiters.propTypes = {
    onShowMore: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

export default ArticleLimiters;
