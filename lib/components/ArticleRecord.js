import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Etc from './Etc';
import DL from './DL';
import BibButton from './BibButton';
import ArticleRecordTitleLink from './ArticleRecordTitleLink';
import translate from '../higherOrderComponents/translate';

const getIconType = (noticeShown, noticeLoaded) => {
    if (noticeShown && noticeLoaded) {
        return { name: 'chevron-down' };
    }

    if (noticeShown) {
        return { name: 'spinner', spin: true };
    }

    return { name: 'chevron-right' };
};

const ArticleRecord = ({
    record,
    isSelected,
    noticeShown,
    notice,
    showNotice,
    selectRecord,
    currentGate,
}) => {
    const {
        id,
        doi,
        title,
        publicationType,
        authors,
        source,
        articleLinks,
    } = record;
    const type = publicationType ? `[${publicationType}]` : '';

    return (
        <div className="record">
            <h4 className="title">
                <BibButton
                    className="notice-opener"
                    icon={getIconType(noticeShown, !!notice)}
                    bsStyle="link"
                    onClick={() => showNotice(id)}
                />

                <input
                    className="record-checkbox"
                    type="checkbox"
                    value={isSelected}
                    checked={isSelected}
                    onChange={() => selectRecord(id)}
                />
                <ArticleRecordTitleLink
                    domain={currentGate}
                    doi={(notice && notice.DOI) || doi}
                    articleLinks={articleLinks}
                    className="fetch-link"
                >
                    {`${id}. ${title} ${type}`}
                </ArticleRecordTitleLink>
            </h4>
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                    {noticeShown && notice ? (
                        <div className="notice">
                            <DL
                                className="notice-list"
                                data={notice}
                                currentGate={currentGate}
                            />
                        </div>
                    ) : (
                        <div>
                            {authors ? (
                                <p>
                                    <Etc list={authors} limit={5} />
                                </p>
                            ) : null}
                            <p>
                                <span>{source}</span>{' '}
                                {doi ? <span>DOI: {doi}</span> : null}
                            </p>
                        </div>
                    )}
                </div>
            </CSSTransitionGroup>
        </div>
    );
};

ArticleRecord.propTypes = {
    record: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    noticeShown: PropTypes.bool.isRequired,
    notice: PropTypes.object,
    showNotice: PropTypes.func.isRequired,
    selectRecord: PropTypes.func.isRequired,
    currentGate: PropTypes.string.isRequired,
};

ArticleRecord.defaultProps = {};

export default translate(ArticleRecord);
