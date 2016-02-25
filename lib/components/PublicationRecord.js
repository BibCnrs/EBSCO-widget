import React, { PropTypes } from 'react';

import FullTextHolding from './FullTextHolding';

const PublicationRecord = ({ publication }) => {
    return (
        <li className="record">
            <div>
                <h4>
                    {`${publication.id}. ${publication.title}`}
                </h4>
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
