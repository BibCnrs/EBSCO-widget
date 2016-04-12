import React, { PropTypes } from 'react';

import FullTextHoldings from './FullTextHoldings';
import translate from '../higherOrderComponents/translate';

const PublicationRecord = ({ publication, index, text, showNotice }) => {
    return (
        <div className="record">
            <h4>
                <a
                    className="fetch-link title"
                    onClick={() => showNotice(index, true)}
                >
                    {`${publication.id}. ${publication.title}`}
                </a>
            </h4>
            <p>
                {`${text.type}: ${publication.type}`}
                {publication.isbnOnline && publication.isbnOnline.length ? `, eISBN: ${publication.isbnOnline.join(', ')}` : null}
                {publication.isbnPrint && publication.isbnPrint.length ? `, pISBN: ${publication.isbnPrint.join(', ')}` : null}
                {publication.issnOnline && publication.issnOnline.length ? `, eISSN: ${publication.issnOnline.join(', ')}` : null}
                {publication.issnPrint && publication.issnPrint.length ? `, pISSN: ${publication.issnPrint.join(', ')}` : null}
            </p>
            <FullTextHoldings data={publication.fullTextHoldings} />
        </div>
    );
};

PublicationRecord.propTypes = {
    publication: PropTypes.object.isRequired
};

PublicationRecord.defaultProps = {
    text: {
        type: 'Type'
    }
};

export default translate(PublicationRecord);
