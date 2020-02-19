import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import parseFullTextHoldings from '../services/parseFullTextHoldings';

const getIconType = (noticeShown, noticeLoaded) => {
    if (noticeShown && noticeLoaded) {
        return { name: 'chevron-down' };
    }

    if (noticeShown) {
        return { name: 'spinner', spin: true };
    }

    return { name: 'chevron-right' };
};

const showResource = id => {
    document.getElementById(`dropdownConsult${id}`).click();
};

class PublicationRecord extends Component {
    render() {
        const { record, noticeShown, notice, text, showNotice } = this.props;
        const {
            id,
            title,
            type,
            isbnOnline,
            isbnPrint,
            issnOnline,
            issnPrint,
            fullTextHoldings,
        } = record;

        const titleType = type ? `[${type}]` : '';
        const reconciledFullTextHoldings = parseFullTextHoldings(
            fullTextHoldings,
        );

        return (
            <div className="record record-publication">
                <h4 className="title">
                    <BibButton
                        className="notice-opener"
                        icon={getIconType(noticeShown, !!notice)}
                        bsStyle="link"
                        onClick={() => showNotice(id)}
                    />
                    {reconciledFullTextHoldings.length === 1 ? (
                        <a
                            className="fetch-link"
                            href={reconciledFullTextHoldings[0].url}
                            target="_blank"
                        >
                            {`${id}. ${title} ${titleType}`}
                        </a>
                    ) : (
                        <a
                            className="fetch-link resource-opener"
                            href="#"
                            onClick={() => showResource(id)}
                        >
                            {id}. {title} {titleType}
                        </a>
                    )}
                </h4>
                <FullTextHoldings
                    title={title}
                    data={reconciledFullTextHoldings}
                    text={text}
                    index={id}
                />
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                        {noticeShown && notice ? (
                            <div className="notice">
                                <DL
                                    className="notice-list"
                                    data={{
                                        ...notice,
                                    }}
                                />
                            </div>
                        ) : (
                            <div>
                                <p>
                                    {[
                                        isbnOnline && isbnOnline.length
                                            ? `eISBN: ${isbnOnline.join(', ')}`
                                            : null,
                                        isbnPrint && isbnPrint.length
                                            ? `pISBN: ${isbnPrint.join(', ')}`
                                            : null,
                                        issnOnline && issnOnline.length
                                            ? `eISSN: ${issnOnline.join(', ')}`
                                            : null,
                                        issnPrint && issnPrint.length
                                            ? `pISSN: ${issnPrint.join(', ')}`
                                            : null,
                                    ]
                                        .filter(value => !!value)
                                        .join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </CSSTransitionGroup>
            </div>
        );
    }
    static propTypes = {
        record: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        noticeShown: PropTypes.bool.isRequired,
        notice: PropTypes.object,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired,
    };
}

PublicationRecord.defaultProps = {
    text: {
        type: 'Type',
        access: 'Accès ressource',
    },
};

export default translate(PublicationRecord, 'PublicationRecord');
