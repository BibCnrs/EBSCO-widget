import React, { PropTypes } from 'react';


const PublicationRecord = ({ publication }) => {
    return (
        <li className="publication">
            <div>
                <h4>
                    {`${publication.id}. ${publication.title}`}
                </h4>
            </div>
        </li>
    );
};

PublicationRecord.propTypes = {
    article: PropTypes.object.isRequired
};

export default PublicationRecord;
