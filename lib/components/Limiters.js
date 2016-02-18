import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import Button from './Button';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedLimiter from '../containers/PeerReviewedLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import AuthorLimiter from '../containers/AuthorLimiter';
import JournalNameLimiter from '../containers/JournalNameLimiter';
import TitleLimiter from '../containers/TitleLimiter';
import LangageLimiter from '../containers/LanguagesLimiter';

const Limiters = ({ moreShown, onShowMore, onReset }) => (
    <div className="limiters">
        <FullTextLimiter/>
        <h4>
            Limiter à
            <Button
                className='reset'
                onClick={() => onReset()}
                label="RàZ"
                tooltip="remise à zéro"
                icon={{ name: 'power-off' }}
            />
        </h4>
        <PeerReviewedLimiter/>
        <PublicationDateLimiter/>
        <div className={moreShown ? 'more-limit shown' : 'more-limit hidden'}>
            <LangageLimiter/>
            <AuthorLimiter/>
            <JournalNameLimiter/>
            <TitleLimiter/>
        </div>
        <Button
            bsStyle="link"
            onClick={() => onShowMore(!moreShown)}
            icon={{ name: moreShown ? 'sort-up' : 'sort-down'}}
            label={moreShown ? 'moins': 'plus'}
        />
    </div>
);

Limiters.propTypes = {
    moreShown: PropTypes.bool.isRequired,
    onShowMore: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

export default Limiters;
