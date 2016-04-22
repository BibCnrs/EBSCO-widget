import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import translate from '../higherOrderComponents/translate';

const PublicationRecord = ({ record, index, text, showNotice }) => {
    const { id, title, type, isbnOnline, isbnPrint, issnOnline, issnPrint, notice, fullTextHoldings, noticeShown } = record;
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
                                {`${text.type}: ${type}`}
                                {isbnOnline && isbnOnline.length ? `, eISBN: ${isbnOnline.join(', ')}` : null}
                                {isbnPrint && isbnPrint.length ? `, pISBN: ${isbnPrint.join(', ')}` : null}
                                {issnOnline && issnOnline.length ? `, eISSN: ${issnOnline.join(', ')}` : null}
                                {issnPrint && issnPrint.length ? `, pISSN: ${issnPrint.join(', ')}` : null}
                            </p>
                            <FullTextHoldings data={fullTextHoldings} />
                        </div>
                    )}
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

PublicationRecord.propTypes = {
    record: PropTypes.object.isRequired
};

PublicationRecord.defaultProps = {
    text: {
        type: 'Type',
        fullText: 'Texte Intégrale'
    }
};

export default translate(PublicationRecord);
