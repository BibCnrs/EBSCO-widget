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
        const { record, index, text, showNotice } = this.props;
        const { id, doi, title, publicationType, authors, source, notice, noticeShown } = record;
        const noticeButton = (
            <BibButton
                className="show-notice"
                label="Notice"
                icon={{ name: noticeShown ? (notice ? 'eye-slash' : 'spinner') : 'eye' , spin: noticeShown && !notice }}
                onClick={() => {
                    if (noticeShown) {
                        this.refs.record.scrollIntoView({ behavior: 'smooth' });
                    }
                    return showNotice(index, !noticeShown);
                }}
            />
        );
        return (
            <div className="record" ref="record">
                <h4>
                    <Input type="checkbox"/>
                    <a

                        className="fetch-link title"
                        onClick={() => showNotice(index, !noticeShown)}
                    >
                        {`${id}. ${title}`}
                    </a>
                </h4>
                {noticeButton}
                <ArticleLink index={index} />
                <p>{publicationType}</p>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                            {
                                noticeShown && notice ? (
                                    <div className="notice">
                                        <DL className="notice-list" data={
                                            [].concat(notice).concat({})
                                            .slice(1)
                                            .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {})
                                        }/>
                                        {noticeButton}
                                        <ArticleLink index={index} />
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
        index: PropTypes.number.isRequired,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired
    }
});


ArticleRecord.defaultProps = {
    text: {
        by: 'Par'
    }
};

export default translate(ArticleRecord);
