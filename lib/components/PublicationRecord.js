import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BibButton from './BibButton';
import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import translate from '../higherOrderComponents/translate';

const PublicationRecord = React.createClass({
    render: function () {
        const { record, noticeShown, isSelected, notice, text, showNotice, selectRecord, exportNotice } = this.props;
        const { id, title, type, isbnOnline, isbnPrint, issnOnline, issnPrint, fullTextHoldings } = record;
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
                                {noticeButton}
                                <BibButton label="export" onClick={() => exportNotice([id])}/>
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
    },
    propTypes: {
        record: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        noticeShown: PropTypes.bool.isRequired,
        isSelected: PropTypes.bool.isRequired,
        notice: PropTypes.array,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired,
        selectRecord: PropTypes.func.isRequired,
        exportNotice: PropTypes.func.isRequired
    }
});



PublicationRecord.defaultProps = {
    text: {
        type: 'Type',
        fullText: 'Texte Intégrale'
    }
};

export default translate(PublicationRecord);
