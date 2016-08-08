import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Etc from './Etc';
import DL from './DL';
import NoticeStatusIcon from './NoticeStatusIcon';
import ArticleLink from './ArticleLink';

const getNoticeItems = (notice, articleLink) => {
    const noticeItems = [].concat(notice.items)
    .slice(1);

    if (notice.dbId) {
        noticeItems.push({ label: notice.dbLabel || 'Database Id', value: notice.dbId });
    }

    if (articleLink && articleLink.fullTextLinks && articleLink.fullTextLinks.length) {
        noticeItems.push({ label: 'fullTextLinks', value: articleLink.fullTextLinks });
    }

    return noticeItems;
};

const ArticleRecord = ({ record, isSelected, noticeShown, notice, showNotice, selectRecord }) => {
    const { id, doi, title, publicationType, authors, source, articleLink } = record;
    const type = publicationType ?`[${publicationType}]` : '';



    return (
        <div className="record">
            <h4 className="title">
                <NoticeStatusIcon noticeShown={noticeShown} noticeLoaded={!!notice}/>
                <input
                    type="checkbox"
                    value={isSelected}
                    checked={isSelected}
                    onChange={() => selectRecord(id)}
                />
                <a
                    className="fetch-link"
                    onClick={() => showNotice(id)}
                >
                    {`${id}. ${title} ${type}`}
                </a>
            </h4>
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                    {
                        noticeShown && notice ? (
                            <div className="notice">
                                <DL className="notice-list" data={
                                    getNoticeItems(notice, articleLink)
                                    .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {})
                                }/>
                            </div>
                        ) : (
                            <div>
                                { authors ? <p><Etc list={authors} limit={5}/></p> : null }
                                <p><span>{source}</span> { doi ? <span>DOI: {doi}</span> : null }</p>
                                <ArticleLink articleLink={articleLink}/>
                            </div>
                        )
                    }
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

ArticleRecord.propTypes = {
    record: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    noticeShown: PropTypes.bool.isRequired,
    notice: PropTypes.object,
    showNotice: PropTypes.func.isRequired,
    selectRecord: PropTypes.func.isRequired
};

ArticleRecord.defaultProps = {};

export default ArticleRecord;
