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
                    {publication.isbnOnline && publication.isbnOnline.length && `, ISBN e: ${publication.isbnOnline.join(', ')}`}
                    {publication.isbnPrint && publication.isbnPrint.length && `, ISBN p: ${publication.isbnPrint.join(', ')}`}
                    {publication.issnOnline && publication.issnOnline.length && `, ISSN e: ${publication.issnOnline.join(', ')}`}
                    {publication.issnPrint && publication.issnPrint.length && `, ISSN p: ${publication.issnPrint.join(', ')}`}
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
