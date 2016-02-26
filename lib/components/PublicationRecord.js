import React, { PropTypes } from 'react';

import FullTextHolding from './FullTextHolding';

const PublicationRecord = ({ publication }) => {
    return (
        <li className="record">
            <div>
                <h4>
                    {`${publication.id}. ${publication.title}`}
                </h4>
                <p>
                    {`Type: ${publication.type}`}
                    {publication.isbnOnline && publication.isbnOnline.length ? `, eISBN: ${publication.isbnOnline.join(', ')}` : null}
                    {publication.isbnPrint && publication.isbnPrint.length ? `, pISBN: ${publication.isbnPrint.join(', ')}` : null}
                    {publication.issnOnline && publication.issnOnline.length ? `, eISSN: ${publication.issnOnline.join(', ')}` : null}
                    {publication.issnPrint && publication.issnPrint.length ? `, pISSN: ${publication.issnPrint.join(', ')}` : null}
                </p>
                <ul className="fulltext-holdings">
                    {publication.fullTextHoldings.map((fullTextHolding, key) => (
                        <FullTextHolding key={key} data={fullTextHolding}/>
                    ))}
                </ul>
            </div>
        </li>
    );
};

PublicationRecord.propTypes = {
    publication: PropTypes.object.isRequired
};

export default PublicationRecord;
