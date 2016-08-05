import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';
import DL from './DL';
import NoticeStatusIcon from './NoticeStatusIcon';
import translate from '../higherOrderComponents/translate';

const ArticleRecord = ({ record, isSelected, noticeShown, notice, text, showNotice, selectRecord }) => {
    const { id, doi, title, publicationType, authors, source } = record;

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
                    {`${id}. ${title} [${publicationType}]`}
                </a>
            </h4>
            <ArticleLink id={id} />
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                    {
                        noticeShown && notice ? (
                            <div className="notice">
                                <DL className="notice-list" data={
                                    [].concat(notice)
                                    .slice(1)
                                    .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {})
                                }/>
                            </div>
                        ) : (
                            <div>
                                { doi ? <p>DOI: {doi}</p> : null }
                                { authors ? <p>{text.by}: <Etc list={authors} limit={5}/></p> : null }
                                <p>{source}</p>
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
    notice: PropTypes.array,
    text: PropTypes.object,
    showNotice: PropTypes.func.isRequired,
    selectRecord: PropTypes.func.isRequired
};


ArticleRecord.defaultProps = {
    text: {
        by: 'Par',
        export: 'Exporter'
    }
};

export default translate(ArticleRecord, 'ArticleRecord');
