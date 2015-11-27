'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedLimiter from '../containers/PeerReviewedLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import AuthorLimiter from '../containers/AuthorLimiter';
import JournalNameLimiter from '../containers/JournalNameLimiter';
import TitleLimiter from '../containers/TitleLimiter';
import LangageLimiter from '../containers/LanguagesLimiter';

const Limiters = ({ moreShown, onShowMore, onReset }) => (
    <div className="limiters">
        <h4>
            Limiter à
        </h4>
        <h5 className={'reset'} onClick={() => onReset()}>Remise à zéro <button className="button"><Icon name={'close'}/></button></h5>
        <FullTextLimiter/>
        <PeerReviewedLimiter/>
        <PublicationDateLimiter/>
        <div className="more-limit" className={moreShown ? 'more-limit shown' : 'more-limit hidden'}>
            <AuthorLimiter/>
            <JournalNameLimiter/>
            <TitleLimiter/>
            <LangageLimiter/>
        </div>
        <h5 className="more-limit-toggle" onClick={() => onShowMore(!moreShown)}>
            <Icon name={moreShown ? 'sort-up' : 'sort-down'}/> {moreShown ? 'moins': 'plus' }
        </h5>
    </div>
);

Limiters.propTypes = {
};

export default Limiters;
