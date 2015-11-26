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

const Limiters = ({ moreShown, onShowMore }) => (
    <div className="limiters">
        <h4>Limiter à</h4>
        <FullTextLimiter/>
        <PeerReviewedLimiter/>
        <PublicationDateLimiter/>
        <button className="button" onClick={() => onShowMore(!moreShown)}>{<Icon name={moreShown ? 'minus' : 'plus'}/>}</button>
        {
            moreShown ?
            <div>
                <AuthorLimiter/>
                <JournalNameLimiter/>
                <TitleLimiter/>
                <LangageLimiter/>
            </div> : null
        }
    </div>
);

Limiters.propTypes = {
};

export default Limiters;
