import PropTypes from 'prop-types';
import React from 'react';

import translate from '../higherOrderComponents/translate';

export const RecordList = ({ records, Record, hasNoFullTextResult, text }) => {
    if (!records.length) {
        return <p>{text.noResults}</p>;
    }

    return (
        <div>
            {hasNoFullTextResult && (
                <div className="no-fulltext">
                    <p>{text.noFullTextResults}</p>
                    <p>{text.noticeOnly}</p>
                </div>
            )}
            <ul className="record_list">
                {records.map((record, index) => (
                    <li key={index}>
                        <Record index={index} record={record} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

RecordList.propTypes = {
    records: PropTypes.array.isRequired,
    Record: PropTypes.func.isRequired,
    hasNoFullTextResult: PropTypes.bool,
    text: PropTypes.object,
};

RecordList.defaultProps = {
    text: {
        noResults: 'No results were found.',
        noFullTextResults:
            'Full text access is not available for this article.\nOnly the document record corresponding to your DOI is available:',
    },
};

export default translate(RecordList);
