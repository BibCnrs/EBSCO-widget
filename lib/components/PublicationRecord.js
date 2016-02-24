import React, { PropTypes } from 'react';

const PublicationRecord = ({ publication }) => {
    return (
        <li className="article">
            <div>
                <h4>
                    {`${publication.id}. ${publication.title}`}
                </h4>
            </div>
        </li>
    );
};

PublicationRecord.propTypes = {
    publication: PropTypes.object.isRequired
};

export default PublicationRecord;
