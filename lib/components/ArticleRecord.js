import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';
import DL from './DL';
import translate from '../higherOrderComponents/translate';

const ArticleRecord = ({ article, showNotice, index, text }) => {
    const { id, title, publicationType, authors, source, notice, noticeShown } = article;
    return (
            <div className="record">
                <ReactCSSTransitionGroup transitionName="v-slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                    <h4>
                        <a
                            className="fetch-link title"
                            onClick={() => showNotice(index, !noticeShown)}
                        >
                            {`${id}. ${title}`}
                        </a>
                    </h4>
                    <p>{publicationType}</p>
                    {
                        noticeShown && notice ? (
                            <div className="notice">
                                <DL className="notice-list" data={
                                    [].concat(notice).concat({})
                                    .slice(1)
                                    .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {})
                                }/>
                            </div>
                        ) : (
                            <div>
                                { authors ? <p>{text.by}: <Etc list={authors} limit={5}/></p> : null }
                                <p>{source}</p>
                            </div>
                        )
                    }
                    <ArticleLink index={index} />
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

ArticleRecord.propTypes = {
    article: PropTypes.object.isRequired
};

ArticleRecord.defaultProps = {
    text: {
        by: 'Par'
    }
};

export default translate(ArticleRecord);
