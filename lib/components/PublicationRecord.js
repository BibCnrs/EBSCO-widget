import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const getIconType = (noticeShown, noticeLoaded) => {
    if (noticeShown && noticeLoaded) {
        return { name: 'chevron-down' };
    }

    if (noticeShown) {
        return { name: 'spinner', spin: true };
    }

    return { name: 'chevron-right' };
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

        return (
            <div className="record" ref="record">
                <h4 className="title">
                    <BibButton
                        icon={getIconType(noticeShown, !!notice)}
                        bsStyle="link"
                        onClick={() => showNotice(id)}
                    />
                    <a className="fetch-link" onClick={() => showNotice(id)}>
                        {`${id}. ${title} ${titleType}`}
                    </a>
                </h4>
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
                                        [text.access]: fullTextHoldings,
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
                                <FullTextHoldings data={fullTextHoldings} />
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
