import React, { PropTypes } from 'react';
import BibButton from './BibButton';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedArticleLimiter from '../containers/PeerReviewedArticleLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import AuthorLimiter from '../containers/AuthorLimiter';
import JournalNameLimiter from '../containers/JournalNameLimiter';
import TitleLimiter from '../containers/TitleLimiter';
import LangageLimiter from '../containers/LanguagesLimiter';

const ArticleLimiters = ({ moreShown, onShowMore, onReset }) => (
    <div className="limiters">
        <FullTextLimiter/>
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
        <PeerReviewedArticleLimiter/>
        <PublicationDateLimiter/>
        <div className={moreShown ? 'more-limit shown' : 'more-limit hidden'}>
            <LangageLimiter/>
            <AuthorLimiter/>
            <JournalNameLimiter/>
            <TitleLimiter/>
        </div>
        <BibButton
            bsStyle="link"
            onClick={() => onShowMore(!moreShown)}
            icon={{ name: moreShown ? 'sort-up' : 'sort-down'}}
            label={moreShown ? 'moins': 'plus'}
        />
    </div>
);

ArticleLimiters.propTypes = {
    moreShown: PropTypes.bool.isRequired,
    onShowMore: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

export default ArticleLimiters;
