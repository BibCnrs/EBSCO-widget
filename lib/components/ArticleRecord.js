import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Etc from './Etc';
import DL from './DL';
import ArticleLink from './ArticleLink';
import BibButton from './BibButton';

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
                    icon={getIconType(noticeShown, !!notice)}
                    bsStyle="link"
                    onClick={() => showNotice(id)}
                />

                <input
                    type="checkbox"
                    value={isSelected}
                    checked={isSelected}
                    onChange={() => selectRecord(id)}
                />
                <a className="fetch-link" onClick={() => showNotice(id)}>
                    {`${id}. ${title} ${type}`}
                </a>
            </h4>
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                    {noticeShown && notice ? (
                        <div className="notice">
                            <DL className="notice-list" data={notice} />
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
                            <ArticleLink
                                articleLinks={articleLinks}
                                currentGate={currentGate}
                            />
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

export default ArticleRecord;
