import React, { PropTypes } from 'react';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';
import DL from './DL';
import translate from '../higherOrderComponents/translate';

const ArticleRecord = ({ article, showNotice, index, text }) => {
    const { id, title, publicationType, authors, source, notice, noticeShown } = article;
    return (
        <div className="record">
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
