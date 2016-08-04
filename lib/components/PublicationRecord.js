import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import NoticeStatusIcon from './NoticeStatusIcon';
import translate from '../higherOrderComponents/translate';

const PublicationRecord = React.createClass({
    render: function () {
        const { record, noticeShown, notice, text, showNotice } = this.props;
        const { id, title, type, isbnOnline, isbnPrint, issnOnline, issnPrint, fullTextHoldings } = record;

        return (
            <div className="record" ref="record">
                <h4 className="title">
                    <NoticeStatusIcon noticeShown={noticeShown} noticeLoaded={!!notice}/>
                    <a
                        className="fetch-link"
                        onClick={() => showNotice(id)}
                    >
                        {`${id}. [${type}]${title} `}
                    </a>
                </h4>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                        { noticeShown && notice ? (
                            <div className="notice">
                                <DL className="notice-list" data={{
                                    ...[].concat(notice)
                                    .slice(1)
                                    .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {}),
                                    [text.fullText]: fullTextHoldings
                                }}/>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    {[
                                        isbnOnline && isbnOnline.length ? `eISBN: ${isbnOnline.join(', ')}` : null,
                                        isbnPrint && isbnPrint.length ? `pISBN: ${isbnPrint.join(', ')}` : null,
                                        issnOnline && issnOnline.length ? `eISSN: ${issnOnline.join(', ')}` : null,
                                        issnPrint && issnPrint.length ? `pISSN: ${issnPrint.join(', ')}` : null
                                    ].filter(value => !!value).join(', ')}
                                </p>
                                <FullTextHoldings data={fullTextHoldings} />
                            </div>
                        )}
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    },
    propTypes: {
        record: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        noticeShown: PropTypes.bool.isRequired,
        notice: PropTypes.array,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired
    }
});

PublicationRecord.defaultProps = {
    text: {
        type: 'Type',
        fullText: 'Texte Intégral'
    }
};

export default translate(PublicationRecord);
