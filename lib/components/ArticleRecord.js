import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Input } from 'react-bootstrap';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';
import BibButton from './BibButton';
import DL from './DL';
import translate from '../higherOrderComponents/translate';

const ArticleRecord = React.createClass({
    render: function () {
        const { record, isSelected, noticeShown, notice, text, showNotice, selectRecord, exportNotice } = this.props;
        const { id, doi, title, publicationType, authors, source } = record;
        const noticeButton = (
            <BibButton
                className="show-notice"
                label="Notice"
                icon={{ name: noticeShown ? (notice ? 'eye-slash' : 'spinner') : 'eye' , spin: noticeShown && !notice }}
                onClick={() => {
                    if (noticeShown) {
                        this.refs.record.scrollIntoView({ behavior: 'smooth' });
                    }
                    return showNotice(id);
                }}
            />
        );

        return (
            <div className="record" ref="record">
                <h4>
                    <Input
                        type="checkbox"
                        value={isSelected}
                        checked={isSelected}
                        onChange={() => selectRecord(id)}
                    />
                    <a
                        className="fetch-link title"
                        onClick={() => showNotice(id)}
                    >
                        {`${id}. ${title}`}
                    </a>
                </h4>
                {noticeButton}
                <ArticleLink id={id} />
                <BibButton label="export" onClick={() => exportNotice([id])}/>
                <p>{publicationType}</p>
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
                                    {noticeButton}
                                    <ArticleLink id={id} />
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
    },
    propTypes: {
        record: PropTypes.object.isRequired,
        isSelected: PropTypes.bool.isRequired,
        noticeShown: PropTypes.bool.isRequired,
        notice: PropTypes.array,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired,
        selectRecord: PropTypes.func.isRequired,
        exportNotice: PropTypes.func.isRequired
    }
});


ArticleRecord.defaultProps = {
    text: {
        by: 'Par',
        export: 'Exporter'
    }
};

export default translate(ArticleRecord);
