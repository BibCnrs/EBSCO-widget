import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedArticleLimiter from '../containers/PeerReviewedArticleLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import translate from '../higherOrderComponents/translate';

const ArticleLimiters = ({ onReset, text }) => {
    return (
        <div className="limiters">
            <FullTextLimiter/>
            <h4>
                <BibButton
                    className='reset'
                    onClick={() => onReset()}
                    label={text.resetLabel}
                    tooltip={text.resetTooltip}
                    icon={{ name: 'power-off' }}
                />
            </h4>
            <PeerReviewedArticleLimiter/>
            <PublicationDateLimiter/>
        </div>
    );
};

ArticleLimiters.propTypes = {
    onShowMore: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

ArticleLimiters.defaultProps = {
    text: {
        resetLabel: 'RàZ',
        resetTooltip: 'remise à zéro'
    }
};

export default translate(ArticleLimiters);
